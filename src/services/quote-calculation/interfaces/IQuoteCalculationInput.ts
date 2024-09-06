import { GeoPosition } from 'src/shared-types/index'

export interface IQuoteCalculationInput {
  pickupLocation: GeoPosition
  dropoffLocation: GeoPosition
  pickupReadyAt?: Date | null
}
