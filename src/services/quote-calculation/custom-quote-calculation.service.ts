import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DELIVERY_QUOTE_PER_MILE } from 'src/constants'
import { IQuoteCalculationInput } from './interfaces/IQuoteCalculationInput'
import { GeoCalculationService } from '../geo-calculation/geo-calculation.service'
import { IQuoteCalculationService } from './interfaces/IQuoteCalculationService'

@Injectable()
export class CustomQuoteCalculationService implements IQuoteCalculationService {
  private readonly logger = new Logger(CustomQuoteCalculationService.name)
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

  calculateDeliveryQuote(input: IQuoteCalculationInput) {
    const quote = Math.random() * this.quotePerMile * 100.3

    return Promise.resolve({
      quoteRangeFrom: quote,
      quoteRangeTo: quote,
    })
  }
}
