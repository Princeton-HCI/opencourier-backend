import { GeoPosition } from 'src/shared-types/index'

export interface IDeliveryDurationCalculationInput {
  pickupLocation: GeoPosition
  dropoffLocation: GeoPosition
}
