import { Injectable, Logger } from '@nestjs/common'
import { DeliveryQuoteDomainService } from 'src/domains/delivery-quote/delivery-quote.domain.service'
import { PartnerDomainService } from 'src/domains/partner/partner.domain.service'
import {
  DeliveryForQuoteAlreadyExistsException,
  DeliveryLocationDoesntMatchQuoteException,
  DeliveryNotFoundException,
  NotFoundException,
  QuoteHasExpiredException,
} from 'src/errors'
import { DeliveryCreatePartnerInput } from './queries/delivery-create.partner.input'
import { LocationDomainService } from 'src/domains/location/location.domain.service'
import { DeliveryDomainService } from 'src/domains/delivery/delivery.domain.service'
import { EnumDeliverableAction, EnumUndeliverableAction } from '@prisma/types'
import { JsonValue } from 'src/shared-types/index'
import { CourierDomainService } from 'src/domains/courier/courier.domain.service'
import { DeliveryUpdatePartnerInput } from './queries/delivery-update.partner.input'
import { QuoteToDeliveryConversionService } from 'src/services/quote-to-delivery-conversion/quote-to-delivery-conversion.service'

@Injectable()
export class DeliveryPartnerRestApiService {
  private readonly logger = new Logger(DeliveryPartnerRestApiService.name)
  constructor(
    private deliveryQuoteDomainService: DeliveryQuoteDomainService,
    private deliveryDomainService: DeliveryDomainService,
    private partnerDomainService: PartnerDomainService,
    private locationDomainService: LocationDomainService,
    private courierDomainService: CourierDomainService,
    private quoteToDeliveryConversionService: QuoteToDeliveryConversionService
  ) {}

  async getManyByPartnerId(partnerId: string, page?: number, perPage?: number) {
    const deliveries = await this.deliveryDomainService.getMany(
      {
        partnerId,
      },
      page,
      perPage
    )

    return deliveries
  }

  async getByIdWithRelations(deliveryId: string, partnerId: string) {
    const delivery = await this.deliveryDomainService.getById(deliveryId)

    if (!delivery) {
      throw new NotFoundException('Delivery not found')
    }

    if (delivery.partnerId !== partnerId) {
      throw new NotFoundException('Delivery not found')
    }

    const locations = await this.locationDomainService.getByIds([delivery.pickupLocationId, delivery.dropoffLocationId])

    const pickupLocation = locations.find((location) => location.id === delivery.pickupLocationId)
    const dropoffLocation = locations.find((location) => location.id === delivery.dropoffLocationId)

    const courierWithSettings = delivery.courierId
      ? await this.courierDomainService.getByIdWithSettings(delivery.courierId)
      : null

    return {
      delivery,
      courierWithSettings,
      pickupLocation,
      dropoffLocation,
    }
  }

  async create(partnerId: string, input: DeliveryCreatePartnerInput) {
    const partner = await this.partnerDomainService.getById(partnerId)

    if (!partner) {
      throw new NotFoundException('Partner not found')
    }

    const deliveryQuote = await this.deliveryQuoteDomainService.getByIdOrThrow(input.quoteId)
    // check if the quote has expired
    if (!deliveryQuote.expiresAt || deliveryQuote.expiresAt < new Date()) {
      throw new QuoteHasExpiredException('Delivery quote has expired')
    }

    const deliveryForQuote = await this.deliveryDomainService.getByDeliveryQuoteId(input.quoteId)
    if (deliveryForQuote) {
      throw new DeliveryForQuoteAlreadyExistsException('Delivery for quote already exists')
    }

    const deliveryQuoteLocations = await this.locationDomainService.getByIds([
      deliveryQuote.pickupLocationId,
      deliveryQuote.dropoffLocationId,
    ])
    const quotePickupLocation = deliveryQuoteLocations.find(
      (location) => location.id === deliveryQuote.pickupLocationId
    )
    const quoteDropoffLocation = deliveryQuoteLocations.find(
      (location) => location.id === deliveryQuote.dropoffLocationId
    )
    if (!quotePickupLocation || !quoteDropoffLocation) {
      throw new NotFoundException('Delivery quote locations not found')
    }

    const isValidPickupLocationDrift = await this.quoteToDeliveryConversionService.isValidDeliveryLocationDrift({
      fromLocation: {
        latitude: quotePickupLocation.latitude,
        longitude: quotePickupLocation.longitude,
      },
      toLocation: {
        latitude: input.pickupLatitude,
        longitude: input.pickupLongitude,
      },
    })
    if (!isValidPickupLocationDrift) {
      throw new DeliveryLocationDoesntMatchQuoteException("Delivery pickup location doesn't match quote location")
    }

    const isValidDropoffLocationDrift = await this.quoteToDeliveryConversionService.isValidDeliveryLocationDrift({
      fromLocation: {
        latitude: quoteDropoffLocation.latitude,
        longitude: quoteDropoffLocation.longitude,
      },
      toLocation: {
        latitude: input.dropoffLatitude,
        longitude: input.dropoffLongitude,
      },
    })
    if (!isValidDropoffLocationDrift) {
      throw new DeliveryLocationDoesntMatchQuoteException("Delivery dropoff location doesn't match quote location")
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

    const delivery = await this.deliveryDomainService.create({
      pickupName: input.pickupName,
      pickupLocationId: pickupLocation.id,
      pickupPhoneNumber: input.pickupPhoneNumber,
      pickupBusinessName: input.pickupBusinessName,
      pickupNotes: input.pickupNotes,
      pickupVerification: input.pickupVerification as any as JsonValue,
      pickupReadyAt: input.pickupReadyAt,
      pickupDeadlineAt: input.pickupDeadlineAt,

      dropoffName: input.dropoffName,
      dropoffLocationId: dropoffLocation.id,
      dropoffPhoneNumber: input.dropoffPhoneNumber,
      dropoffBusinessName: input.dropoffBusinessName,
      dropoffNotes: input.dropoffNotes,
      dropoffReadyAt: input.dropoffReadyAt,
      dropoffEta: deliveryQuote.dropoffEta,
      dropoffDeadlineAt: input.dropoffDeadlineAt,
      dropoffSellerNotes: input.dropoffSellerNotes,
      dropoffVerification: input.dropoffVerification as any as JsonValue,

      deliverableAction: input.deliverableAction as EnumDeliverableAction,
      undeliverableAction: input.undeliverableAction as EnumUndeliverableAction,

      orderItems: input.orderItems as any as JsonValue,
      orderReference: input.orderReference,
      orderTotalValue: input.orderTotalValue,

      requiresDropoffSignature: input.requiresDropoffSignature,
      requiresId: input.requiresId,

      currencyCode: deliveryQuote.currency,
      idempotencyKey: input.idempotencyKey,

      externalStoreId: input.externalStoreId,
      returnVerification: input.returnVerification as any as JsonValue,
      externalId: input.externalId,

      totalCost: deliveryQuote.quote,

      tips: input.tip,

      partnerId: partnerId,
      deliveryQuoteId: deliveryQuote.id,
    })

    return delivery
  }

  async update(deliveryId: string, partnerId: string, input: DeliveryUpdatePartnerInput) {
    const delivery = await this.deliveryDomainService.getByIdOrThrow(deliveryId)

    if (delivery.partnerId !== partnerId) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    const dropoffLocation = await this.locationDomainService.getById(delivery.dropoffLocationId)
    if (!dropoffLocation) {
      throw new NotFoundException('Delivery locations not found')
    }

    const isValidDropoffLocationDrift = await this.quoteToDeliveryConversionService.isValidDeliveryLocationDrift({
      fromLocation: {
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      },
      toLocation: {
        latitude: input.dropoffLatitude,
        longitude: input.dropoffLongitude,
      },
    })
    if (!isValidDropoffLocationDrift) {
      throw new DeliveryLocationDoesntMatchQuoteException("Delivery dropoff location doesn't match quote location")
    }

    await this.locationDomainService.update(delivery.dropoffLocationId, {
      latitude: input.dropoffLatitude,
      longitude: input.dropoffLongitude,
    })

    const updatedDelivery = await this.deliveryDomainService.update(delivery.id, {
      pickupNotes: input.pickupNotes,
      pickupVerification: input.pickupVerification as any as JsonValue,
      pickupReadyAt: input.pickupReadyAt,
      pickupDeadlineAt: input.pickupDeadlineAt,

      dropoffNotes: input.dropoffNotes,
      dropoffReadyAt: input.dropoffReadyAt,
      dropoffDeadlineAt: input.dropoffDeadlineAt,
      dropoffVerification: input.dropoffVerification as any as JsonValue,

      orderReference: input.orderReference,

      tips: input.tipByCustomer,
    })

    return updatedDelivery
  }

  async cancel(deliveryId: string, partnerId: string) {
    const delivery = await this.deliveryDomainService.getByIdOrThrow(deliveryId)

    if (delivery.partnerId !== partnerId) {
      throw new DeliveryNotFoundException('Delivery not found')
    }

    const updatedDelivery = await this.deliveryDomainService.cancelDelivery(deliveryId)

    return updatedDelivery
  }
}
