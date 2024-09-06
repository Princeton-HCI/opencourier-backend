import { EnumEventActor, EnumDeliveryEventSource, EnumDeliveryStatus, EnumDeliveryEventType } from '@prisma/types'

export interface IDeliveryEventCreateInput {
  actor: EnumEventActor
  eventSource: EnumDeliveryEventSource
  message: string | null
  newStatus: EnumDeliveryStatus | null
  oldStatus: EnumDeliveryStatus | null
  deliveryId: string
  transitionSuccessful: boolean
  type: EnumDeliveryEventType
}
