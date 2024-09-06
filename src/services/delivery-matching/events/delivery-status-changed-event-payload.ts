import { EnumDeliveryStatus } from '@prisma/types'
import { PartnerWebhookEventType } from '../enums/partner-webhook-event-type.enum'
import { IPartnerWebhookPayload } from '../interfaces/IPartnerWebhookPayload'

export class DeliveryStatusChangedEventPayload implements IPartnerWebhookPayload {
  eventType: PartnerWebhookEventType
  partnerId: string
  deliveryId: string
  oldStatus: EnumDeliveryStatus
  newStatus: EnumDeliveryStatus
}
