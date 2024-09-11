import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ConfigService } from '@nestjs/config'
import { EnumCourierStatus, EnumDeliveryEventType, EnumDeliveryStatus } from '@prisma/types'
import { DeliveryEvent, STATE_MACHINE } from 'src/shared-types/index'
import { NEST_DELIVERY_EVENT_NAME } from './delivery-event.type'
import { InconsistentDataError } from '../../errors'
import { PICKUP_ORDER_FORCED_FULFILL_DELAY_MINUTES } from '../../constants'
import { isRecordNotFoundError } from '../../prisma.util'
import { WebsocketDispatcher } from '../websocket/models/WebsocketDispatcher'
import { TaskBusScheduler } from '../taskBus/models/TaskBusScheduler'
import { TaskBusService } from '../taskBus/taskBus.service'
import { CourierRepository } from 'src/persistence/repositories/courier.repository'
import { DeliveryRepository } from 'src/persistence/repositories/delivery.repository'
import { DeliveryEventRepository } from 'src/persistence/repositories/delivery-event.repository'
import { PartnerWebhookService } from '../partner-webhooks/partner-webhooks.service'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { DeliveryMatchingService } from '../delivery-matching/delivery-matching.service'
import { DeliveryCalculationService } from '../delivery-calculation/delivery-calculation.service'
import { DeliveryCourierDto } from 'src/rest-api/delivery/courier/dtos/delivery.courier.dto'

interface ForcePickupFulfillmentPayload {
  deliveryId: string
}

@Injectable()
export class DeliveryEventService {
  private readonly logger = new Logger(DeliveryEventService.name)

  constructor(
    private readonly configService: ConfigService,
    // private readonly deliveryService: DeliveryService,
    private readonly websocketDispatcher: WebsocketDispatcher,
    private readonly courierRepository: CourierRepository,
    private readonly deliveryRepository: DeliveryRepository,
    // private readonly deliverySchedulerService: DeliverySchedulerService,
    private readonly deliveryEventRepository: DeliveryEventRepository,
    private readonly taskScheduler: TaskBusScheduler,
    private readonly taskBusService: TaskBusService,
    private readonly partnerWebhookService: PartnerWebhookService,
    private readonly deliveryMatchingService: DeliveryMatchingService,
    private readonly deliveryCalculationService: DeliveryCalculationService
  ) {
    // this.taskBusService.registerTaskHandler(
    //   'schedule-force-pickup-fulfillment',
    //   (payload: ForcePickupFulfillmentPayload) => {
    //     return this.processForcePickupFulfillment(payload.deliveryId)
    //   }
    // )
  }

  async processDeliveryEvent(originalEvent: DeliveryEvent): Promise<void> {
    this.logger.log(`Processing order event: ${JSON.stringify(originalEvent)}`)
    const deliveryEvent = { ...originalEvent }
    const deliveryId = deliveryEvent.deliveryId

    let currentStatus: EnumDeliveryStatus | undefined
    let newStatus: EnumDeliveryStatus | undefined

    try {
      let dbDelivery: DeliveryEntity | null
      try {
        dbDelivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)
      } catch (error) {
        if (error instanceof Error && isRecordNotFoundError(error)) {
          throw new InconsistentDataError(`Delivery with ID ${deliveryId} does not exist`)
        }
        throw error
      }

      currentStatus = dbDelivery.status
      newStatus = STATE_MACHINE[currentStatus].on[deliveryEvent.type]

      if (!newStatus) {
        this.logger.warn(
          `No transition exists for delivery ${deliveryId} from status ${currentStatus} via event ${deliveryEvent.type}`
        )
        return
      }

      switch (newStatus) {
        case EnumDeliveryStatus.CREATED: {
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} was created by: ${deliveryEvent.actor}`)

          break
        }
        case EnumDeliveryStatus.ASSIGNING_COURIER: {
          if (deliveryEvent.type === EnumDeliveryEventType.REJECTED) {
            this.logger.log(`Delivery ${deliveryEvent.deliveryId} was rejected by: ${deliveryEvent.courierId}`)
          }

          const matchingData = await this.deliveryMatchingService.matchDeliveryToCourier(deliveryId)

          if (!matchingData) {
            this.logger.log(`No courier found for delivery ${deliveryId}`)
            break
          }

          const { courier, delivery } = matchingData

          this.logger.log(`Delivery ${deliveryEvent.deliveryId} is being assigned a courier: ${courier.id}`)

          const deliveryAmounts = await this.deliveryCalculationService.calculateDeliveryAmountsForMatchedCourier({
            deliveryId: delivery.id,
          })

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (!deliveryAmounts) {
            this.logger.log(`Delivery amounts couldn't be calculated for delivery: ${deliveryId}`)
            break
          }

          // Update the delivery amounts with the calculated values
          const { totalCost, totalCompensation, fee, feePercentage } = deliveryAmounts
          await this.updateDeliveryAmounts(deliveryId, totalCost, totalCompensation, fee, feePercentage)

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)

          this.logger.log(`Sending offer to courier: ${courier.id}`)
          await this.websocketDispatcher.sendOfferToCourier(courier.userId, new DeliveryCourierDto(delivery))
          break
        }
        case EnumDeliveryStatus.ACCEPTED: {
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} was accepted by: ${deliveryEvent.actor}`)

          const courierId = deliveryEvent.courierId
          if (!courierId) {
            throw new NotFoundException('Courier ID is required for dispatching')
          }

          await this.deliveryRepository.update(deliveryId, { courierId })

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)

          const courier = await this.courierRepository.findByIdOrThrow(courierId)

          if (courier.status === EnumCourierStatus.LAST_CALL) {
            await this.courierRepository.updateById(courierId, {
              status: EnumCourierStatus.OFFLINE,
            })
          }
          break
        }
        case EnumDeliveryStatus.DISPATCHED: {
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} was dispatched by: ${deliveryEvent.actor}`)

          const courierId = dbDelivery.courierId
          if (!courierId) {
            throw new NotFoundException('Courier ID is required for dispatching')
          }

          await this.deliveryRepository.update(deliveryId, { courierId })

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        }
        case EnumDeliveryStatus.ON_THE_WAY: {
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} was marked as on the way  by: ${deliveryEvent.actor}`)

          const courierId = dbDelivery.courierId
          if (!courierId) {
            throw new NotFoundException('Courier ID is required for dispatching')
          }

          await this.deliveryRepository.update(deliveryId, { courierId })

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        }
        case EnumDeliveryStatus.COURIER_ARRIVED_AT_PICKUP_LOCATION:
          this.logger.log(
            `Delivery ${deliveryEvent.deliveryId}, courier has arrived at pickup location: ${deliveryEvent.actor}`
          )

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        case EnumDeliveryStatus.PICKED_UP:
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} was picked up by: ${deliveryEvent.actor}`)

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        case EnumDeliveryStatus.COURIER_ARRIVED_AT_DROPOFF_LOCATION:
          this.logger.log(
            `Delivery ${deliveryEvent.deliveryId}, courier has arrived at dropoff location: ${deliveryEvent.actor}`
          )

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        case EnumDeliveryStatus.DROPPED_OFF:
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} was dropped off by: ${deliveryEvent.actor}`)

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        case EnumDeliveryStatus.FAILED: {
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} has failed with reason: ${deliveryEvent.message}`)

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        }
        case EnumDeliveryStatus.CANCELED: {
          this.logger.log(`Delivery ${deliveryEvent.deliveryId} was canceled by: ${deliveryEvent.actor}`)

          await this.updateDeliveryAndSendNotifications(deliveryEvent, newStatus, currentStatus)
          break
        }
        default:
          this.logger.warn(`Received an unsupported order status event ${deliveryEvent}`)
      }
    } catch (error) {
      this.logger.error(
        `Delivery status transition failed for event ${JSON.stringify(deliveryEvent)}:  ${error}`,
        (error as Error).stack
      )
      await this.saveDeliveryEvent(deliveryEvent, false, currentStatus, newStatus, (error as Error).message)
    }
  }

  @OnEvent(NEST_DELIVERY_EVENT_NAME)
  private async handleDeliveryUpdateEvent(event: DeliveryEvent) {
    await this.processDeliveryEvent(event)
  }

  private async updateDeliveryAndSendNotifications(
    deliveryEvent: DeliveryEvent,
    newStatus: EnumDeliveryStatus,
    oldStatus: EnumDeliveryStatus
  ) {
    const updatedDelivery = await this.updateDeliveryStatus(deliveryEvent.deliveryId, newStatus)

    await this.saveDeliveryEvent(deliveryEvent, true, newStatus, oldStatus)

    if (updatedDelivery.partnerId) {
      await this.notifyPartner(updatedDelivery.partnerId, newStatus, oldStatus, deliveryEvent)
    }

    if (updatedDelivery.courierId) {
      await this.notifyCourier(updatedDelivery.courierId, updatedDelivery, newStatus, oldStatus, deliveryEvent)
    }
  }

  private async updateDeliveryAmounts(
    deliveryId: string,
    totalCost: number,
    totalCompensation: number,
    fee: number,
    feePercentage: number
  ) {
    await this.deliveryRepository.update(deliveryId, {
      totalCost,
      totalCompensation,
      fee,
      feePercentage,
    })
  }

  private async notifyPartner(
    userId: string,
    newStatus: EnumDeliveryStatus,
    oldStatus: EnumDeliveryStatus,
    event: DeliveryEvent
  ) {
    try {
      await this.partnerWebhookService.sendDeliveryUpdatePartnerWebhook({
        deliveryId: event.deliveryId,
        oldStatus: oldStatus,
        status: newStatus,
        event: event,
      })
    } catch (error) {
      this.logger.error(
        `Error sending event notification for delivery ${event.deliveryId} to partner ${userId}: ${error}`
      )
    }
  }
  private async notifyCourier(
    courierId: string,
    delivery: DeliveryEntity,
    newStatus: EnumDeliveryStatus,
    oldStatus: EnumDeliveryStatus,
    deliveryEvent: DeliveryEvent
  ) {
    try {
      this.logger.log(`Sending delivery updated: ${courierId}`)
      const courier = await this.courierRepository.findByIdOrThrow(courierId)

      await this.websocketDispatcher.dispatchDeliveryStatusUpdated(
        courier.userId,
        oldStatus,
        newStatus,
        new DeliveryCourierDto(delivery)
      )
    } catch (error) {
      this.logger.error(
        `Error sending event notification for delivery ${delivery.id} to courier ${courierId}: ${error}`
      )
    }
  }

  private async saveDeliveryEvent(
    deliveryEvent: DeliveryEvent,
    transitionSuccessful: boolean,
    targetStatus?: EnumDeliveryStatus,
    oldStatus?: EnumDeliveryStatus,
    message?: string
  ) {
    return await this.deliveryEventRepository.create({
      actor: deliveryEvent.actor,
      eventSource: deliveryEvent.source,
      message: message || deliveryEvent.message || null,
      newStatus: targetStatus || null,
      oldStatus: oldStatus || null,
      deliveryId: deliveryEvent.deliveryId,
      transitionSuccessful,
      type: deliveryEvent.type,
    })
  }

  private async updateDeliveryStatus(deliveryId: string, status: EnumDeliveryStatus) {
    const updatedDelivery = await this.deliveryRepository.update(deliveryId, {
      status: status,
    })

    return updatedDelivery
  }

  async schedulePickupDeliveryFulfillAndCapture(deliveryId: string) {
    const date = new Date(Date.now() + PICKUP_ORDER_FORCED_FULFILL_DELAY_MINUTES * 60 * 1000)

    this.logger.log(`Scheduling ${deliveryId} order pickup fulfillment ${date}`)
    await this.taskScheduler.scheduleTask<ForcePickupFulfillmentPayload>('schedule-force-pickup-fulfillment', date, {
      deliveryId,
    })
  }
}
