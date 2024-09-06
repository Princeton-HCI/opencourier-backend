import { EnumDeliveryEventType } from '@prisma/types'

export interface ISubmitDeliveryEvent {
  deliveryId: string
  eventType: EnumDeliveryEventType
}
