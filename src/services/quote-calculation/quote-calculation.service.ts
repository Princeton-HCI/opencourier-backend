import { Injectable, Logger } from '@nestjs/common'
import { IQuoteCalculationInput } from './interfaces/IQuoteCalculationInput'
import { IQuoteCalculationService } from './interfaces/IQuoteCalculationService'
import { EnumQuoteCalculationType } from 'src/shared-types/index'
import { ModuleRef } from '@nestjs/core'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { DeliveryQuoteAmountResult } from './types/delivery-quote-amount-result.type'

@Injectable()
export class QuoteCalculationService implements IQuoteCalculationService {
  private readonly logger = new Logger(QuoteCalculationService.name)

  constructor(private readonly moduleRef: ModuleRef, private configDomainService: ConfigDomainService) {}

  async calculateDeliveryQuote(
    input: IQuoteCalculationInput,
    quoteCalculationType?: EnumQuoteCalculationType
  ): Promise<DeliveryQuoteAmountResult> {
    const implementation = await this.resolveClass(quoteCalculationType)

    return implementation.calculateDeliveryQuote(input)
  }

  private async resolveClass(quoteCalculationType?: EnumQuoteCalculationType): Promise<IQuoteCalculationService> {
    if (!quoteCalculationType) {
      quoteCalculationType = await this.getCalculationTypeFromDB()
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!quoteCalculationType) {
      throw new Error('Quote calculation type not set')
    }

    try {
      const implementation = await this.moduleRef.resolve(quoteCalculationType)

      // check if the implementation implements IQuoteCalculationService
      if (!implementation.calculateDeliveryQuote) {
        throw new Error(`Calculation type ${quoteCalculationType} does not implement IQuoteCalculationService`)
      }

      return implementation
    } catch (error) {
      throw new Error(
        `Calculation type not found for ${quoteCalculationType}. Please check QuoteCalculationModule providers`
      )
    }
  }

  async getCalculationTypeFromDB(): Promise<EnumQuoteCalculationType> {
    const quoteCalculationType = await this.configDomainService.instanceConfig.getQuoteCalculationTypeSetting()
    if (Object.values(EnumQuoteCalculationType).indexOf(quoteCalculationType) < 0) {
      throw new Error(`Invalid default quote calculation type: ${quoteCalculationType}`)
    }

    return quoteCalculationType
  }
}
