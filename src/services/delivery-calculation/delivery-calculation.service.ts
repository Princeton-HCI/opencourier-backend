import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { addMinutes } from 'src/core/utils/time'
import { QuoteCalculationService } from '../quote-calculation/quote-calculation.service'
import { GeoCalculationService } from '../geo-calculation/geo-calculation.service'
import { IDeliveryCalculationsInput } from './interfaces/IDeliveryCalculationsInput'
import { DeliveryDurationCalculationService } from '../duration-calculation/delivery-duration-calculation.service'
import { IDeliveryQuoteDropoffEtaCalculationInput } from './interfaces/IDeliveryQuoteDropoffEtaCalculationInput'
import { IDeliveryCalculationService } from './interfaces/IDeliveryCalculationService'
import { DeliveryQuoteAmountResult } from '../quote-calculation/types/delivery-quote-amount-result.type'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { IDeliveryAmountsCalculationsInput } from './interfaces/IDeliveryAmountsCalculationsInput'
import { CourierCompensationService } from '../courier-compensation/courier-compensation.service'
import { IDeliveryAmountsCalculationsResult } from './interfaces/IDeliveryAmountsCalculationsResult'
import { DeliveryRepository } from 'src/persistence/repositories/delivery.repository'
import { roundMoney } from 'src/core/utils/money'

interface DeliveryQuoteAmountResultWithFeePercentage extends DeliveryQuoteAmountResult {
  feePercentage: number
}

@Injectable()
export class DeliveryCalculationService implements IDeliveryCalculationService {
  private readonly logger = new Logger(DeliveryCalculationService.name)

  constructor(
    private readonly configDomainService: ConfigDomainService,
    private readonly deliveryRepository: DeliveryRepository,
    private readonly geoCalculationService: GeoCalculationService,
    private readonly quoteCalculationService: QuoteCalculationService,
    private readonly courierCompensationService: CourierCompensationService,
    private readonly deliveryDurationCalculationModule: DeliveryDurationCalculationService
  ) {}

  async calculateDeliveryQuoteDistance(input: IDeliveryCalculationsInput) {
    const { pickupLocation, dropoffLocation } = input

    return Promise.resolve(
      this.geoCalculationService.calculateDistance({
        fromLocation: pickupLocation,
        toLocation: dropoffLocation,
      })
    )
  }

  async calculateDeliveryQuoteAmount(
    input: IDeliveryCalculationsInput
  ): Promise<DeliveryQuoteAmountResultWithFeePercentage> {
    const { pickupLocation, dropoffLocation, pickupReadyAt } = input

    const quote = await this.quoteCalculationService.calculateDeliveryQuote({
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      pickupReadyAt: pickupReadyAt,
    })

    const feePercentage = await this.configDomainService.instanceConfig.getFeePercentageAmount()
    const quoteFromWithFee = this.addFeeToAmount(quote.quoteRangeFrom, feePercentage)
    const quoteToWithFee = this.addFeeToAmount(quote.quoteRangeTo, feePercentage)

    return {
      quoteRangeFrom: roundMoney(quoteFromWithFee.amount),
      quoteRangeTo: roundMoney(quoteToWithFee.amount),
      feePercentage: feePercentage,
    }
  }

  async calculateDeliveryAmountsForMatchedCourier(
    input: IDeliveryAmountsCalculationsInput
  ): Promise<IDeliveryAmountsCalculationsResult> {
    const { deliveryId } = input

    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      this.logger.error(`Delivery not found: ${deliveryId}`)
      throw new BadRequestException('Delivery not found')
    }

    if (!delivery.matchedCourierId) {
      this.logger.error(`Delivery has no matched courier: ${deliveryId}`)
      throw new BadRequestException('Delivery not found')
    }

    const courierCompensation = await this.courierCompensationService.calculateCourierCompensationForDelivery({
      courierId: delivery.matchedCourierId,
      deliveryId: deliveryId,
    })

    const feePercentage = await this.configDomainService.instanceConfig.getFeePercentageAmount()

    const totalCostCalculation = this.addFeeToAmount(courierCompensation, feePercentage)

    return {
      deliveryId: deliveryId,
      totalCompensation: roundMoney(courierCompensation),
      totalCost: roundMoney(totalCostCalculation.amount),
      fee: roundMoney(totalCostCalculation.fee),
      feePercentage: feePercentage,
    }
  }

  async calculateDeliveryQuoteExpiration(input: IDeliveryCalculationsInput) {
    const quoteExpirationMinutes = await this.configDomainService.instanceConfig.getQuoteExpirationMinutes()

    if (!quoteExpirationMinutes) {
      throw new BadRequestException('Missing quote expiration minutes configuration')
    }

    return Promise.resolve(addMinutes(new Date(), quoteExpirationMinutes))
  }

  async calculateDeliveryQuoteDeliveryDuration(input: IDeliveryCalculationsInput) {
    const { pickupLocation, dropoffLocation } = input

    return Promise.resolve(
      this.deliveryDurationCalculationModule.calculateDeliveryDuration({
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
      })
    )
  }

  async calculateDeliveryQuoteDeliveryPickupDuration(input: IDeliveryCalculationsInput) {
    const { pickupLocation, dropoffLocation } = input

    return Promise.resolve(
      this.deliveryDurationCalculationModule.calculateDeliveryDuration({
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation,
      })
    )
  }

  async calculateDropoffEta(input: IDeliveryQuoteDropoffEtaCalculationInput) {
    const { pickupReadyAt, duration } = input

    if (!pickupReadyAt || !duration) {
      this.logger.warn('pickupReadyAt and duration are required to calculate dropoff')
      return null
    }

    const dropoffEta = new Date(new Date(pickupReadyAt).getTime() + duration * 60000)

    return Promise.resolve(dropoffEta)
  }

  private addFeeToAmount(amount: number, feePercentage: number): { amount: number; fee: number } {
    if (amount <= 0) {
      return {
        amount: 0,
        fee: 0,
      }
    }

    if (feePercentage <= 0) {
      return {
        amount,
        fee: 0,
      }
    }

    let total = amount * (1 + feePercentage / 100)
    total = Math.round(total * 1000) / 1000

    let fee = total - amount
    fee = Math.round(fee * 1000) / 1000

    return {
      amount: total,
      fee,
    }
  }
}
