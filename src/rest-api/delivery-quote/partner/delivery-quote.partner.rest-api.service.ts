import { Injectable, Logger } from '@nestjs/common'
import { DeliveryQuoteDomainService } from 'src/domains/delivery-quote/delivery-quote.domain.service'
import { LocationDomainService } from 'src/domains/location/location.domain.service'
import { PartnerDomainService } from 'src/domains/partner/partner.domain.service'
import { NotFoundException } from 'src/errors'
import { CourierMatcherService } from 'src/services/courier-matcher/courier-matcher.service'
import { DeliverQuoteCreatePartnerInput } from './queries/delivery-quote-create.partner.input'

@Injectable()
export class DeliveryQuotePartnerRestApiService {
  private readonly logger = new Logger(DeliveryQuotePartnerRestApiService.name)
  constructor(
    private deliveryQuoteDomainService: DeliveryQuoteDomainService,
    private partnerDomainService: PartnerDomainService,
    private locationDomainService: LocationDomainService,
    private courierMatcherService: CourierMatcherService
  ) {}

  async getByIdOrThrow(deliveryQuoteId: string) {
    const deliveryQuote = await this.deliveryQuoteDomainService.getByIdOrThrow(deliveryQuoteId)

    return deliveryQuote
  }

  async create(partnerId: string, input: DeliverQuoteCreatePartnerInput) {
    const partner = await this.partnerDomainService.getById(partnerId)

    if (!partner) {
      throw new NotFoundException('Partner not found')
    }

    const pickupLocation = await this.locationDomainService.findOrCreate({
      ...input.pickupAddress,
      latitude: input.pickupLatitude,
      longitude: input.pickupLongitude,
    })
    const dropoffLocation = await this.locationDomainService.findOrCreate({
      ...input.dropoffAddress,
      latitude: input.dropoffLatitude,
      longitude: input.dropoffLongitude,
    })

    const result = await this.courierMatcherService.findCourierForDelivery({
      pickupLocation: {
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      },
      dropoffLocation: {
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      },
      rejectedCourierIds: [],
      contains: input.contains || [],
      restaurantTags: input.restaurantTags || [],
    })

    // TODO: Improve error message, no driver available.
    if (!result) return null

    const deliveryQuote = await this.deliveryQuoteDomainService.create(pickupLocation, dropoffLocation, partner, {
      pickupPhoneNumber: input.pickupPhoneNumber,
      dropoffPhoneNumber: input.dropoffPhoneNumber,
      pickupReadyAt: input.pickupReadyAt,
      pickupDeadlineAt: input.pickupDeadlineAt,
      dropoffReadyAt: input.dropoffReadyAt,
      dropoffDeadlineAt: input.dropoffDeadlineAt,
      orderTotalValue: input.orderTotalValue,
    })

    return deliveryQuote
  }
}
