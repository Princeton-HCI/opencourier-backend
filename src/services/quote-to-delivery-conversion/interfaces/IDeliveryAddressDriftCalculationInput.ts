import { GeoPosition } from 'src/shared-types/index'

export interface IDeliveryAddressDriftCalculationInput {
  fromLocation: GeoPosition
  toLocation: GeoPosition
}
