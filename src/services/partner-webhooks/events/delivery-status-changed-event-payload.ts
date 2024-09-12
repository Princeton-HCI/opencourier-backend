import { EnumDeliveryEventType, EnumDeliveryStatus } from '@prisma/types'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { PartnerWebhookEventType } from '../enums/partner-webhook-event-type.enum'
import { IPartnerWebhookPayload } from '../interfaces/IPartnerWebhookPayload'

export class DeliveryStatusChangedEventPayload implements IPartnerWebhookPayload {
  eventType: PartnerWebhookEventType
  event: EnumDeliveryEventType
  partnerId: string
  deliveryId: string
  oldStatus: EnumDeliveryStatus
  newStatus: EnumDeliveryStatus
  delivery: DeliveryEntity
  courier: CourierEntity | null
}
