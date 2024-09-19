import { GeoPosition } from 'src/shared-types/index'

export interface ICourierMatcherInput {
  deliveryId?: string
  pickupLocation: GeoPosition
  dropoffLocation: GeoPosition
  rejectedCourierIds: string[]
}
