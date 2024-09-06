import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DELIVERY_QUOTE_PER_MILE } from 'src/constants'
import { IQuoteCalculationInput } from './interfaces/IQuoteCalculationInput'
import { GeoCalculationService } from '../geo-calculation/geo-calculation.service'
import { IQuoteCalculationService } from './interfaces/IQuoteCalculationService'

@Injectable()
export class SurgeQuoteCalculationService implements IQuoteCalculationService {
  private readonly logger = new Logger(SurgeQuoteCalculationService.name)
  private quotePerMile: number

  constructor(
    private readonly configService: ConfigService,
    private readonly geoCalculationService: GeoCalculationService
  ) {
    if (!this.configService.get(DELIVERY_QUOTE_PER_MILE)) {
      throw new Error('DELIVERY_QUOTE_PER_MILE env variable is required')
    }
    this.quotePerMile = Number(this.configService.get(DELIVERY_QUOTE_PER_MILE))
  }

  async calculateDeliveryQuote(input: IQuoteCalculationInput) {
    const { pickupLocation, dropoffLocation, pickupReadyAt } = input

    const distance = await this.geoCalculationService.calculateDistance({
      fromLocation: {
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      },
      toLocation: {
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      },
    })

    let quote = distance * this.quotePerMile

    // depending on time of day, we may want to add a surge multiplier.
    const hour = pickupReadyAt?.getHours()
    if (hour && (hour >= 22 || hour < 6)) {
      quote = quote * 1.5
    }

    return Promise.resolve({
      quoteRangeFrom: quote,
      quoteRangeTo: quote,
    })
  }
}
