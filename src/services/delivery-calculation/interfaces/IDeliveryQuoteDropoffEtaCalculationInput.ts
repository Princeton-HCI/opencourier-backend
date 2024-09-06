export interface IDeliveryQuoteDropoffEtaCalculationInput {
  pickupLocation: {
    latitude: number
    longitude: number
  }
  dropoffLocation: {
    latitude: number
    longitude: number
  }
  pickupReadyAt?: Date | null
  duration?: number
}
