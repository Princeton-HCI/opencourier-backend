import { EnumDeliveryStatus } from '@prisma/types'
import { DeliveryCourierDto } from 'src/rest-api/delivery/courier/dtos/delivery.courier.dto'

export abstract class WebsocketDispatcher {
  abstract sendOfferToCourier(courierUserId: string, delivery: DeliveryCourierDto): Promise<void> | void
  abstract dispatchDeliveryStatusUpdated(
    courierUserId: string,
    oldStatus: EnumDeliveryStatus,
    newStatus: EnumDeliveryStatus,
    delivery: DeliveryCourierDto
  ): Promise<void> | void
}
