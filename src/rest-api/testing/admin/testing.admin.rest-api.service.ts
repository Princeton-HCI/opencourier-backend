import { Injectable, NotFoundException } from '@nestjs/common'
import { TestDeliveryCreateAdminInput } from './dtos/test-delivery-create.admin.input'
import { DeliveryDomainService } from 'src/domains/delivery/delivery.domain.service'
import { DeliveryQuoteDomainService } from 'src/domains/delivery-quote/delivery-quote.domain.service'
import { PartnerDomainService } from 'src/domains/partner/partner.domain.service'
import { LocationDomainService } from 'src/domains/location/location.domain.service'
import { DeliveryForQuoteAlreadyExistsException } from 'src/errors'
import { DeliveryQuoteEntity } from 'src/domains/delivery-quote/entities/delivery-quote.entity'
import { EnumCourierMatcherType } from 'src/shared-types/index'
import { EnumDeliverableAction, EnumUndeliverableAction } from '@prisma/types'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { CourierMatcherService } from 'src/services/courier-matcher/courier-matcher.service'
import { StaticCourierMatcherService } from 'src/services/courier-matcher/static-courier-matcher.service'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class TestingAdminRestApiService {
  constructor(
    private readonly deliveryDomainService: DeliveryDomainService,
    private readonly deliveryQuoteDomainService: DeliveryQuoteDomainService,
    private readonly partnerDomainService: PartnerDomainService,
    private readonly locationDomainService: LocationDomainService,
    private readonly configDomainService: ConfigDomainService,
    private readonly courierMatcherService: CourierMatcherService
  ) {}

  async createTestQuoteAndDelivery(data: TestDeliveryCreateAdminInput): Promise<any> {
    let quote

    if (data.quoteId) {
      const deliveryForQuote = await this.deliveryDomainService.getByDeliveryQuoteId(data.quoteId)
      if (deliveryForQuote) {
        throw new DeliveryForQuoteAlreadyExistsException('Delivery for quote already exists')
      }

      quote = await this.deliveryQuoteDomainService.getById(data.quoteId)

      if (!quote) {
        throw new NotFoundException('Quote not found')
      }
    } else {
      quote = await this.createTestDeliveryQuote(data.partnerId, data)
    }

    const delivery = await this.createTestDeliveryFromQuote(quote, data)

    return delivery
  }

  async createTestDeliveryFromQuote(deliveryQuote: DeliveryQuoteEntity, input: TestDeliveryCreateAdminInput) {
    const creationData = {
      pickupName: input.pickupName,
      pickupLocationId: deliveryQuote.pickupLocationId,
      pickupPhoneNumber: input.pickupPhoneNumber,
      pickupBusinessName: input.pickupBusinessName,
      pickupNotes: input.pickupNotes,
      pickupReadyAt: input.pickupReadyAt,
      pickupDeadlineAt: input.pickupDeadlineAt,

      dropoffName: input.dropoffName,
      dropoffLocationId: deliveryQuote.dropoffLocationId,
      dropoffPhoneNumber: input.dropoffPhoneNumber,
      dropoffBusinessName: input.dropoffBusinessName,
      dropoffReadyAt: input.dropoffReadyAt,
      dropoffEta: deliveryQuote.dropoffEta,
      dropoffDeadlineAt: input.dropoffDeadlineAt,

      deliverableAction: input.deliverableAction as EnumDeliverableAction,
      undeliverableAction: input.undeliverableAction as EnumUndeliverableAction,

      currencyCode: deliveryQuote.currency,
      idempotencyKey: uuidv4(),

      partnerId: deliveryQuote.partnerId,
      deliveryQuoteId: deliveryQuote.id,
    }

    const courierToMatchTo = input.courierToMatchTo
    if (!courierToMatchTo) {
      return await this.deliveryDomainService.create(creationData)
    }

    // We temporarily set the static matcher to the courier we want to match to
    return await this.courierMatcherService.temporarilySetStaticMatcher(EnumCourierMatcherType.STATIC, async () => {
      const oldStaticCourierId = StaticCourierMatcherService.getStaticCourierId()

      StaticCourierMatcherService.setStaticCourierId(courierToMatchTo)

      const delivery = await this.deliveryDomainService.create(creationData)

      StaticCourierMatcherService.setStaticCourierId(oldStaticCourierId)

      return delivery
    })
  }

  async createTestDeliveryQuote(partnerId: string, data: TestDeliveryCreateAdminInput) {
    const partner = await this.partnerDomainService.getById(partnerId)

    if (!partner) {
      throw new NotFoundException('Partner not found')
    }

    const pickupLocation = await this.locationDomainService.findOrCreate({
      ...data.pickupAddress,
      latitude: data.pickupLatitude,
      longitude: data.pickupLongitude,
    })
    const dropoffLocation = await this.locationDomainService.findOrCreate({
      ...data.dropoffAddress,
      latitude: data.dropoffLatitude,
      longitude: data.dropoffLongitude,
    })

    const deliveryQuote = await this.deliveryQuoteDomainService.create(pickupLocation, dropoffLocation, partner, {
      pickupPhoneNumber: data.pickupPhoneNumber,
      dropoffPhoneNumber: data.dropoffPhoneNumber,
      pickupReadyAt: data.pickupReadyAt,
      pickupDeadlineAt: data.pickupDeadlineAt,
      dropoffReadyAt: data.dropoffReadyAt,
      dropoffDeadlineAt: data.dropoffDeadlineAt,
      orderTotalValue: data.orderTotalValue,
    })

    return deliveryQuote
  }
}
