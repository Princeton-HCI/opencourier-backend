import { Injectable, Logger } from '@nestjs/common'
import { DeliveryQuoteDomainService } from 'src/domains/delivery-quote/delivery-quote.domain.service'
import { PartnerDomainService } from 'src/domains/partner/partner.domain.service'
import { NotFoundException } from 'src/errors'
import { DeliverQuoteCreatePartnerInput } from './queries/delivery-quote-create.partner.input'
import { LocationDomainService } from 'src/domains/location/location.domain.service'

@Injectable()
export class DeliveryQuotePartnerRestApiService {
  private readonly logger = new Logger(DeliveryQuotePartnerRestApiService.name)
  constructor(
    private deliveryQuoteDomainService: DeliveryQuoteDomainService,
    private partnerDomainService: PartnerDomainService,
    private locationDomainService: LocationDomainService
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
