import { GeoPosition } from 'src/shared-types/index'
import { CourierEntity } from '../entities/courier.entity'

export type ICourierFindNearestResult = {
  courier: CourierEntity
  distance: number
  courierLocation: GeoPosition
  pickupLocation: GeoPosition
}
