import { Injectable, NotFoundException } from '@nestjs/common'
import { DeliveryDomainService } from 'src/domains/delivery/delivery.domain.service'
import { DeliveryQuoteDomainService } from 'src/domains/delivery-quote/delivery-quote.domain.service'
import { LocationDomainService } from 'src/domains/location/location.domain.service'
import { PartnerDomainService } from 'src/domains/partner/partner.domain.service'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { EnumDeliverableAction, EnumUndeliverableAction } from '@prisma/types'
import { v4 as uuidv4 } from 'uuid'
import { ManualRequestQuoteAdminInput } from './queries/manual-request-quote.admin.input'
import { ManualRequestDeliveryAdminInput } from './queries/manual-request-delivery.admin.input'

@Injectable()
export class ManualRequestAdminRestApiService {
  constructor(
    private readonly deliveryDomainService: DeliveryDomainService,
    private readonly deliveryQuoteDomainService: DeliveryQuoteDomainService,
    private readonly locationDomainService: LocationDomainService,
    private readonly partnerDomainService: PartnerDomainService,
    private readonly configDomainService: ConfigDomainService,
  ) {}

  /**
   * Creates a delivery quote (estimate) from human-supplied form data.
   * No delivery is committed at this point.
   */
  async createQuote(input: ManualRequestQuoteAdminInput) {
    let partner = input.partnerId
      ? await this.partnerDomainService.getById(input.partnerId)
      : await this.partnerDomainService.getFirst()

    if (!partner) {
      throw new NotFoundException(
        input.partnerId
          ? `Partner with id "${input.partnerId}" not found`
          : 'No partner found in the system',
      )
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

    const deliveryQuote = await this.deliveryQuoteDomainService.create(
      pickupLocation,
      dropoffLocation,
      partner,
      {
        pickupPhoneNumber: input.pickupPhoneNumber,
        pickupName: input.pickupName,
        dropoffPhoneNumber: input.dropoffPhoneNumber,
        dropoffName: input.dropoffName,
        pickupReadyAt: input.pickupReadyAt ?? undefined,
        pickupDeadlineAt: input.pickupDeadlineAt ?? undefined,
        dropoffReadyAt: input.dropoffReadyAt ?? undefined,
        dropoffDeadlineAt: input.dropoffDeadlineAt ?? undefined,
        orderTotalValue: input.orderTotalValue ?? undefined,
      }
    )

    return deliveryQuote
  }

  /**
   * Confirms a delivery using a previously created quote ID.
   * This is the "commit" step after the operator has reviewed the estimate.
   */
  async confirmDelivery(input: ManualRequestDeliveryAdminInput) {
    const quote = await this.deliveryQuoteDomainService.getById(input.quoteId)
    if (!quote) {
      throw new NotFoundException(`Quote with id "${input.quoteId}" not found or expired`)
    }

    const existingDelivery = await this.deliveryDomainService.getByDeliveryQuoteId(input.quoteId)
    if (existingDelivery) {
      throw new Error(`A delivery for quote "${input.quoteId}" already exists (id: ${existingDelivery.id})`)
    }

    const creationData = {
      pickupName: input.pickupName,
      pickupLocationId: quote.pickupLocationId,
      pickupPhoneNumber: input.pickupPhoneNumber,
      pickupBusinessName: input.pickupBusinessName,
      pickupNotes: input.pickupNotes ?? null,
      pickupReadyAt: input.pickupReadyAt ?? null,
      pickupDeadlineAt: input.pickupDeadlineAt ?? null,

      dropoffName: input.dropoffName,
      dropoffLocationId: quote.dropoffLocationId,
      dropoffPhoneNumber: input.dropoffPhoneNumber,
      dropoffBusinessName: input.dropoffBusinessName ?? null,
      dropoffNotes: input.dropoffNotes ?? null,
      dropoffReadyAt: input.dropoffReadyAt ?? null,
      dropoffEta: quote.dropoffEta,
      dropoffDeadlineAt: input.dropoffDeadlineAt ?? null,

      // Default sensible actions for manual operator requests
      deliverableAction: EnumDeliverableAction.MEET_AT_DOOR,
      undeliverableAction: EnumUndeliverableAction.RETURN,

      orderReference: input.orderReference ?? null,

      currencyCode: quote.currency,
      idempotencyKey: uuidv4(),

      partnerId: quote.partnerId,
      deliveryQuoteId: quote.id,
    }

    const delivery = await this.deliveryDomainService.create(creationData)
    return delivery
  }

  /**
   * Cancel a delivery. Delegates to the delivery domain event system.
   */
  async cancelDelivery(deliveryId: string) {
    const delivery = await this.deliveryDomainService.getByIdOrThrow(deliveryId)
    return delivery
  }
}
