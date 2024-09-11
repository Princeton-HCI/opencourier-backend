import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { LocationEntity } from 'src/domains/location/entities/location.entity'

export type NewDeliveryCourier = DeliveryEntity & {
  pickupLocation: LocationEntity
  dropoffLocation: LocationEntity
}
