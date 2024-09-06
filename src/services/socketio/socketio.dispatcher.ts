import { Injectable, Logger } from '@nestjs/common'

import { WebsocketDispatcher } from '../../services/websocket/models/WebsocketDispatcher'
import { DeliveryCourierDto } from 'src/rest-api/delivery/courier/dtos/delivery.courier.dto'
import { SocketIOService } from './socketio.service'
import { EnumDeliveryStatus, NotificationEventType, courierNotificationChannel } from 'src/shared-types/index'

@Injectable()
export class SocketIODispatcher extends WebsocketDispatcher {
  private readonly logger = new Logger(SocketIODispatcher.name)

  constructor(private readonly socketIOService: SocketIOService) {
    super()
  }

  async sendOfferToCourier(userId: string, delivery: DeliveryCourierDto) {
    const data = {
      delivery,
    }

    this.logger.log(`emitting event to courier: ${JSON.stringify(data)}, channel: COURIER:${userId}`)

    await this.publishMessage(courierNotificationChannel(userId), NotificationEventType.NEW_DELIVERY_OFFER, data)
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
      await this.socketIOService.publishMessage(channelName, messageName, message)
    } catch (error) {
      this.logger.error(`There was a problem trying to publish a message to socketio channel ${channelName}.`, error)
    }
  }
}
