export interface IDeliveryQuoteCreationData {
  pickupPhoneNumber?: string | null
  pickupName?: string | null
  dropoffPhoneNumber?: string | null
  dropoffName?: string | null
  pickupReadyAt?: Date | string | null
  pickupDeadlineAt?: Date | string | null
  dropoffReadyAt?: Date | string | null
  dropoffDeadlineAt?: Date | string | null
  orderTotalValue?: number
}
