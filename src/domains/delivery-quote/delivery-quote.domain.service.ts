import { Injectable, Logger } from '@nestjs/common'
import { DeliveryQuoteRepository } from 'src/persistence/repositories/delivery-quote.repository'
import { DeliveryQuoteWhereArgs } from './types/delivery-quote-where-args.type'
import { DeliveryCalculationService } from 'src/services/delivery-calculation/delivery-calculation.service'
import { LocationEntity } from '../location/entities/location.entity'
import { IDeliveryQuoteCreationData } from './interfaces/IDeliveryQuoteCreationData'
import { PartnerEntity } from '../partner/entities/partner.entity'
import { IDeliveryCalculationsInput } from 'src/services/delivery-calculation/interfaces/IDeliveryCalculationsInput'
import { ConfigDomainService } from '../config/config.domain.service'

@Injectable()
export class DeliveryQuoteDomainService {
  private readonly logger = new Logger(DeliveryQuoteDomainService.name)

  constructor(
    private configDomainService: ConfigDomainService,
    private deliveryQuoteRepository: DeliveryQuoteRepository,
    private deliveryCalculationService: DeliveryCalculationService
  ) {}

  async getById(deliveryQuoteId: string, otherFilters?: DeliveryQuoteWhereArgs) {
    const deliveryQuote = await this.deliveryQuoteRepository.findById(deliveryQuoteId, otherFilters)

    return deliveryQuote
  }

  async getByIdOrThrow(deliveryQuoteId: string, otherFilters?: DeliveryQuoteWhereArgs) {
    const deliveryQuote = await this.deliveryQuoteRepository.findByIdOrThrow(deliveryQuoteId, otherFilters)

    return deliveryQuote
  }

  async getMany(args: DeliveryQuoteWhereArgs, page?: number, perPage?: number) {
    const deliveryQuotes = await this.deliveryQuoteRepository.findManyPaginated(args, page, perPage)

    return deliveryQuotes
  }

  async create(
    pickupLocation: LocationEntity,
    dropoffLocation: LocationEntity,
    partner: PartnerEntity,
    input: IDeliveryQuoteCreationData
  ) {
    const deliveryQuoteCalculationData: IDeliveryCalculationsInput = {
      pickupLocation: {
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      },
      dropoffLocation: {
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      },
      orderTotalValue: input.orderTotalValue,
      pickupReadyAt: input.pickupReadyAt ? new Date(input.pickupReadyAt) : null,
      timeOfDay: new Date(),
    }

    const { quoteRangeFrom, quoteRangeTo, feePercentage } =
      await this.deliveryCalculationService.calculateDeliveryQuoteAmount(deliveryQuoteCalculationData)
    const distance = await this.deliveryCalculationService.calculateDeliveryQuoteDistance(deliveryQuoteCalculationData)
    const expiresAt = await this.deliveryCalculationService.calculateDeliveryQuoteExpiration(
      deliveryQuoteCalculationData
    )
    const durationRaw = await this.deliveryCalculationService.calculateDeliveryQuoteDeliveryDuration(
      deliveryQuoteCalculationData
    )
    // duration is stored as Int; fractional minutes (e.g. 0.92 mi * 2 = 1.84) must be rounded or they truncate to 1.
    const durationMinutes = Math.round(durationRaw)
    const dropoffEta = await this.deliveryCalculationService.calculateDropoffEta({
      ...deliveryQuoteCalculationData,
      pickupReadyAt: input.pickupReadyAt ? new Date(input.pickupReadyAt) : null,
      duration: durationMinutes,
    })

    const deliveryQuote = await this.deliveryQuoteRepository.create({
      quoteRangeFrom,
      quoteRangeTo,
      feePercentage,
      expiresAt,
      duration: durationMinutes,
      distance,
      currency: await this.configDomainService.instanceConfig.getCurrency(),
      distanceUnit: await this.configDomainService.instanceConfig.getDistanceUnit(),
      pickupPhoneNumber: input.pickupPhoneNumber,
      dropoffPhoneNumber: input.dropoffPhoneNumber,
      pickupReadyAt: input.pickupReadyAt,
      pickupDeadlineAt: input.pickupDeadlineAt,
      dropoffEta,
      dropoffReadyAt: input.dropoffReadyAt,
      dropoffDeadlineAt: input.dropoffDeadlineAt,
      orderTotalValue: input.orderTotalValue,
      pickupLocationId: pickupLocation.id,
      dropoffLocationId: dropoffLocation.id,
      partnerId: partner.id,
    })

    return deliveryQuote
  }
}
