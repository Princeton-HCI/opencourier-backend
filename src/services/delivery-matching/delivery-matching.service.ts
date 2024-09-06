import { Injectable, Logger } from '@nestjs/common'
import { CourierDomainService } from 'src/domains/courier/courier.domain.service'
import { LocationDomainService } from 'src/domains/location/location.domain.service'
import { CourierMatcherService } from '../courier-matcher/courier-matcher.service'
import { CacheService } from '../cache/cache.service'
import { CacheHelpers } from '../cache/cache.helpers'
import { DeliveryNotFoundException, DeliveryOfferAlreadyMatchedException } from 'src/errors'
import { DeliveryRepository } from 'src/persistence/repositories/delivery.repository'

@Injectable()
export class DeliveryMatchingService {
  private readonly logger = new Logger(DeliveryMatchingService.name)
  constructor(
    private readonly courierDomainService: CourierDomainService,
    private readonly locationDomainService: LocationDomainService,
    private readonly courierMatcherService: CourierMatcherService,
    private readonly deliveryRepository: DeliveryRepository,
    private readonly cacheService: CacheService
  ) {} 

  async matchDeliveryToCourier(deliveryId: string) {
    this.logger.log(`Matching Delivery ${deliveryId} to courier`)

    const delivery = await this.deliveryRepository.findByIdOrThrow(deliveryId)
    if (!delivery.partnerId) {
      this.logger.error(`Delivery ${delivery.id} not found`)
      throw new DeliveryNotFoundException(`Delivery ${deliveryId} not found`)
    }

    if (delivery.courierId) {
      this.logger.log(`Delivery ${deliveryId} already matched to courier ${delivery.courierId}`)
      throw new DeliveryOfferAlreadyMatchedException(`Delivery ${deliveryId} already matched to courier ${delivery.courierId}`)
    }

    const matchedCourierId = delivery.matchedCourierId

    if (matchedCourierId) {
      this.logger.log(`Delivery ${deliveryId} is already offered to ${matchedCourierId}`)
      throw new DeliveryOfferAlreadyMatchedException(`Delivery ${deliveryId} is already offered to ${matchedCourierId}`)
    }

    const pickupLocation = await this.locationDomainService.getByIdOrThrow(delivery.pickupLocationId)
    const dropoffLocation = await this.locationDomainService.getByIdOrThrow(delivery.dropoffLocationId)

    const result = await this.courierMatcherService.findCourierForDelivery({
      deliveryId: delivery.id,
      pickupLocation: {
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      },
      dropoffLocation: {
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      },
      rejectedCourierIds: await this.getRejectedCourierIds(delivery.id)
    })

    if (!result) {
      this.logger.debug(`No courier found for delivery ${delivery.id}`)
      return
    }

    const courier = await this.courierDomainService.getByIdOrThrow(result.courierId)
    this.logger.log(`Matched courier: ${courier.firstName} ${courier.lastName}`)

    const updatedDelivery = await this.deliveryRepository.update(delivery.id, {
      // matchedCourierId: null,
      matchedCourierId: courier.id,
    })

    return {
      courier,
      delivery: updatedDelivery
    }
  }

  async getRejectedCourierIds(deliveryId: string) {
    const cacheKey = CacheHelpers.getDeliveryRejectedCouriersKey(deliveryId);
    const rejectedCourierIds = await this.cacheService.getOrDefault<Array<string>>(cacheKey, [])

    return rejectedCourierIds
  }
}
