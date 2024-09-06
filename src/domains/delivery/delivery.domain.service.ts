import { Injectable, Logger } from '@nestjs/common'
import { DeliveryRepository } from 'src/persistence/repositories/delivery.repository'
import { DeliveryWhereArgs } from './types/delivery-where-args.type'
import { EnumDeliveryEventSource, EnumDeliveryEventType, EnumDeliveryStatus, EnumEventActor } from '@prisma/types'
import { IDeliveryUpdate } from './interfaces/IDeliveryUpdate'
import { IDeliveryCreate } from './interfaces/IDeliveryCreate'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CacheService } from 'src/services/cache/cache.service'
import { CacheHelpers } from 'src/services/cache/cache.helpers'
import {
  CantUpdateDeliveryStatusError,
  DeliveryCantBeAcceptedException,
  DeliveryCantBeRejectedException,
} from 'src/errors'
import { DeliveryEventService } from 'src/services/delivery-event/delivery-event.service'
import {
  DeliveryAcceptedEvent,
  DeliveryCanceledEvent,
  DeliveryConfirmedEvent,
  DeliveryDispatchedEvent,
  DeliveryDroppedOffEvent,
  DeliveryFailedEvent,
  DeliveryPickedUpEvent,
  DeliveryRejectedEvent,
} from 'src/shared-types/index'
import { ISubmitDeliveryEvent } from '../delivery-event/interfaces/ISubmitDeliveryEvent'

@Injectable()
export class DeliveryDomainService {
  private readonly logger = new Logger(DeliveryDomainService.name)
  constructor(
    private deliveryRepository: DeliveryRepository,
    private eventEmitter: EventEmitter2,
    private cacheService: CacheService,
    private deliveryEventService: DeliveryEventService
  ) {}

  async getById(deliveryId: string, otherFilters?: DeliveryWhereArgs) {
    const delivery = await this.deliveryRepository.findById(deliveryId, otherFilters)

    return delivery
  }

  async getByIdOrThrow(deliveryId: string, otherFilters?: DeliveryWhereArgs) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId, otherFilters)

    return delivery
  }

  async getByDeliveryQuoteId(deliveryQuoteId: string) {
    const delivery = await this.deliveryRepository.findByDeliveryQuoteId(deliveryQuoteId)

    return delivery
  }

  async getMany(args: DeliveryWhereArgs, page?: number, perPage?: number) {
    const deliveries = await this.deliveryRepository.findManyPaginated(args, page, perPage)

    return deliveries
  }

  async getManyWithIncludes(args: DeliveryWhereArgs, page?: number, perPage?: number) {
    const deliveries = await this.deliveryRepository.findManyPaginated(args, page, perPage)

    return deliveries
  }

  async update(deliveryId: string, input: IDeliveryUpdate) {
    const delivery = await this.deliveryRepository.update(deliveryId, input)

    return delivery
  }

  async create(input: IDeliveryCreate) {
    const delivery = await this.deliveryRepository.create(input)

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.CREATED,
      actor: EnumEventActor.PARTNER,
      source: EnumDeliveryEventSource.PARTNER_APP,
      message: `Delivery was created delivery ${delivery.id} from partner ${input.partnerId}`,
    })

    return delivery
  }

  async acceptDelivery(deliveryId: string, courierId: string) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    if (delivery.status !== EnumDeliveryStatus.ASSIGNING_COURIER) {
      throw new DeliveryCantBeAcceptedException(
        `Delivery ${deliveryId} cant be accepted, it is on status ${delivery.status}`
      )
    }

    const matchedCourierId = delivery.matchedCourierId
    if (!matchedCourierId) {
      throw new DeliveryCantBeAcceptedException(`Delivery ${deliveryId} is not matched to any courier`)
    }

    if (matchedCourierId !== courierId) {
      throw new DeliveryCantBeAcceptedException(
        `Courier ${courierId} is not matched to delivery ${deliveryId}, is matched to ${matchedCourierId}`
      )
    }

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.ACCEPTED,
      actor: EnumEventActor.COURIER,
      courierId: courierId,
      source: EnumDeliveryEventSource.OPENCOURIER,
      message: `Courier ${courierId} accepted delivery ${delivery.id}`,
    })

    return delivery
  }

  async rejectDelivery(deliveryId: string, courierId: string) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    if (delivery.status !== EnumDeliveryStatus.ASSIGNING_COURIER) {
      throw new DeliveryCantBeRejectedException(
        `Delivery ${deliveryId} cant be rejected, it is on status ${delivery.status}`
      )
    }

    const dbMatchedCourierId = delivery.matchedCourierId

    if (!dbMatchedCourierId) {
      throw new DeliveryCantBeRejectedException(`Delivery ${deliveryId} is not matched to any courier`)
    }
    if (dbMatchedCourierId !== courierId) {
      throw new DeliveryCantBeRejectedException(
        `Courier ${courierId} is not matched to delivery ${deliveryId}, is matched to ${dbMatchedCourierId}`
      )
    }

    // Remove the cached offered courierId
    await this.deliveryRepository.update(delivery.id, { matchedCourierId: null })

    // Add the courier to the rejected list for this delivery
    await this.addCourierToRejectedList(deliveryId, courierId)

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.REJECTED,
      actor: EnumEventActor.COURIER,
      courierId: courierId,
      source: EnumDeliveryEventSource.OPENCOURIER,
      message: `Courier ${courierId} rejected delivery ${delivery.id}`,
    })

    return delivery
  }

  async cancelDelivery(deliveryId: string) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.CANCELED,
      actor: EnumEventActor.PARTNER,
      source: EnumDeliveryEventSource.PARTNER_APP,
      message: `Delivery ${delivery.id} was canceled by partner ${delivery.partnerId}`,
    })

    return delivery
  }

  async markAsDelivered(deliveryId: string, deliveredData: any) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    // TODO
    // if (delivery.status !== EnumDeliveryStatus.PICKED_UP) {
    //   throw new CantUpdateDeliveryStatusError(
    //     `Delivery ${deliveryId} can not be marked as delivered, it hasn't been picked up. On status ${delivery.status}`
    //   )
    // }

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.DROPPED_OFF,
      actor: EnumEventActor.COURIER,
      courierId: delivery.courierId,
      source: EnumDeliveryEventSource.OPENCOURIER,
      message: `Delivery ${delivery.id} was marked as delivered by courier ${delivery.courierId}`,
      deliveredData,
    })

    return delivery
  }

  async markAsDispatched(deliveryId: string) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    if (delivery.status !== EnumDeliveryStatus.ACCEPTED) {
      throw new CantUpdateDeliveryStatusError(
        `Delivery ${deliveryId} can not be marked as dispatched. On status ${delivery.status}`
      )
    }

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.DISPATCHED,
      actor: EnumEventActor.COURIER,
      courierId: delivery.courierId,
      source: EnumDeliveryEventSource.OPENCOURIER,
      message: `Delivery ${delivery.id} was marked as dispatched by courier ${delivery.courierId}`,
    })

    return delivery
  }

  async markAsPickedUp(deliveryId: string) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    // TODO
    // if (delivery.status !== EnumDeliveryStatus.DISPATCHED) {
    //   throw new CantUpdateDeliveryStatusError(
    //     `Delivery ${deliveryId} can not be marked as picked up, it hasn't been dispatched. On status ${delivery.status}`
    //   )
    // }

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.PICKED_UP,
      actor: EnumEventActor.COURIER,
      courierId: delivery.courierId,
      source: EnumDeliveryEventSource.OPENCOURIER,
      message: `Delivery ${delivery.id} was marked as pickedup by courier ${delivery.courierId}`,
    })

    return delivery
  }

  async markAsOnTheWay(deliveryId: string) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    if (delivery.status !== EnumDeliveryStatus.PICKED_UP) {
      throw new CantUpdateDeliveryStatusError(
        `Delivery ${deliveryId} can not be marked as on the way, it hasn't been picked up. On status ${delivery.status}`
      )
    }

    await this.deliveryEventService.processDeliveryEvent({
      deliveryId: delivery.id,
      type: EnumDeliveryEventType.ON_THE_WAY,
      actor: EnumEventActor.COURIER,
      courierId: delivery.courierId,
      source: EnumDeliveryEventSource.OPENCOURIER,
      message: `Delivery ${delivery.id} was marked as on the way by courier ${delivery.courierId}`,
    })

    return delivery
  }

  async updateDeliveryStatus(deliveryId: string, status: EnumDeliveryStatus) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)

    const updatedDelivery = await this.deliveryRepository.update(delivery.id, {
      status,
    })

    return updatedDelivery
  }

  async addCourierToRejectedList(deliveryId: string, courierId: string) {
    const rejectedKey = CacheHelpers.getDeliveryRejectedCouriersKey(deliveryId)
    const rejectedCouriers = await this.cacheService.getOrDefault<Array<string>>(rejectedKey, [])

    if (!rejectedCouriers.includes(courierId)) rejectedCouriers.push(courierId)

    await this.cacheService.save<Array<string>>(rejectedKey, rejectedCouriers, 60 * 20)
  }

  async submitDeliveryEvent(event: ISubmitDeliveryEvent, message?: string) {
    const actor = EnumEventActor.ADMIN

    switch (event.eventType) {
      case EnumDeliveryEventType.CONFIRMED:
        const confirmedEvent: DeliveryConfirmedEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.CONFIRMED,
          actor,
          source: EnumDeliveryEventSource.OPENCOURIER,
          message,
        }
        await this.deliveryEventService.processDeliveryEvent(confirmedEvent)
        break
      case EnumDeliveryEventType.ACCEPTED:
        const preparedEvent: DeliveryAcceptedEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.ACCEPTED,
          actor,
          message,
          source: EnumDeliveryEventSource.OPENCOURIER,
        }
        await this.deliveryEventService.processDeliveryEvent(preparedEvent)
        break
      case EnumDeliveryEventType.DISPATCHED:
        const dispatchedEvent: DeliveryDispatchedEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.DISPATCHED,
          actor,
          message,
          source: EnumDeliveryEventSource.OPENCOURIER,
        }
        await this.deliveryEventService.processDeliveryEvent(dispatchedEvent)
        break
      case EnumDeliveryEventType.REJECTED:
        const rejectedEvent: DeliveryRejectedEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.REJECTED,
          actor,
          source: EnumDeliveryEventSource.OPENCOURIER,
          message,
        }
        await this.deliveryEventService.processDeliveryEvent(rejectedEvent)
        break
      case EnumDeliveryEventType.PICKED_UP:
        const pickedUpEvent: DeliveryPickedUpEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.PICKED_UP,
          actor,
          message,
          source: EnumDeliveryEventSource.OPENCOURIER,
        }
        await this.deliveryEventService.processDeliveryEvent(pickedUpEvent)
        break
      case EnumDeliveryEventType.CANCELED:
        const canceledEvent: DeliveryCanceledEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.CANCELED,
          actor,
          source: EnumDeliveryEventSource.OPENCOURIER,
          message: `order canceled by admin`,
        }
        await this.deliveryEventService.processDeliveryEvent(canceledEvent)
        break
      case EnumDeliveryEventType.DROPPED_OFF:
        const droppedOffEvent: DeliveryDroppedOffEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.DROPPED_OFF,
          actor,
          source: EnumDeliveryEventSource.OPENCOURIER,
          message,
          deliveredData: {},
        }
        await this.deliveryEventService.processDeliveryEvent(droppedOffEvent)
        break
      case EnumDeliveryEventType.FAILED:
        const failedEvent: DeliveryFailedEvent = {
          deliveryId: event.deliveryId,
          type: EnumDeliveryEventType.FAILED,
          actor,
          source: EnumDeliveryEventSource.OPENCOURIER,
          message,
        }
        await this.deliveryEventService.processDeliveryEvent(failedEvent)
        break
      default:
        this.logger.log('Unknown status')
        break
    }

    return this.getByIdOrThrow(event.deliveryId)
  }
}
