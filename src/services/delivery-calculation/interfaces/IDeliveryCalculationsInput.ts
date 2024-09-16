export interface IDeliveryCalculationsInput {
  pickupLocation: {
    latitude: number
    longitude: number
  }
  dropoffLocation: {
    latitude: number
    longitude: number
  }
  orderTotalValue?: number
  pickupReadyAt?: Date | null
  timeOfDay: Date
}
