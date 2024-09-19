import { Injectable, Logger } from '@nestjs/common'

import { WebsocketDispatcher } from '../../services/websocket/models/WebsocketDispatcher'
import { AblyService } from './ably.service'
import { DeliveryCourierDto } from 'src/rest-api/delivery/courier/dtos/delivery.courier.dto'
import { EnumDeliveryStatus, NotificationEventType, courierNotificationChannel } from 'src/shared-types/index'

@Injectable()
export class AblyDispatcher extends WebsocketDispatcher {
  private readonly logger = new Logger(AblyDispatcher.name)

  constructor(private readonly ablyService: AblyService) {
    super()
  }

  async sendOfferToCourier(userId: string, delivery: DeliveryCourierDto) {
    this.logger.log(`emitting event to courier: ${JSON.stringify(delivery)}, channel: COURIER:${userId}`)
    await this.publishMessage(courierNotificationChannel(userId), NotificationEventType.NEW_DELIVERY_OFFER, delivery)
  }
  async dispatchDeliveryStatusUpdated(
    userId: string,
    oldStatus: EnumDeliveryStatus,
    newStatus: EnumDeliveryStatus,
    delivery: DeliveryCourierDto
  ) {
    const data = {
      delivery,
      oldStatus,
      newStatus,
    }

    this.logger.log(
      `emitting ${NotificationEventType.DELIVERY_STATUS_UPDATED} event to courier: ${JSON.stringify(
        data
      )}, channel: COURIER:${userId}`
    )

    await this.publishMessage(courierNotificationChannel(userId), NotificationEventType.DELIVERY_STATUS_UPDATED, data)
  }

  private async publishMessage(channelName: string, messageName: string, message: any) {
    try {
      await this.ablyService
        .getChannel(channelName)
        .publish(messageName, message)
        .catch((error) => {
          console.log('error sending message:', error)
        })
    } catch (error) {
      this.logger.error(`There was a problem trying to publish a message to ably channel ${channelName}.`, error)
    }
  }
}
