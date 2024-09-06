import { Injectable, Logger } from '@nestjs/common'
import { IDeliveryAddressDriftCalculationInput } from './interfaces/IDeliveryAddressDriftCalculationInput'
import { IQuoteToDeliveryConversionService } from './interfaces/IQuoteToDeliveryConversionService'
import { ModuleRef } from '@nestjs/core'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { EnumQuoteToDeliveryConversionServiceType } from 'src/shared-types/index'

@Injectable()
export class QuoteToDeliveryConversionService implements IQuoteToDeliveryConversionService {
  private readonly logger = new Logger(QuoteToDeliveryConversionService.name)

  constructor(
    private readonly moduleRef: ModuleRef,
    private configDomainService: ConfigDomainService,
  ) {}

  async isValidDeliveryLocationDrift(
    input: IDeliveryAddressDriftCalculationInput,
    quoteToDeliveryType?: EnumQuoteToDeliveryConversionServiceType,
  ): Promise<boolean> {
    const implementation = await this.resolveClass(quoteToDeliveryType)

    return implementation.isValidDeliveryLocationDrift(input)
  }

  private async resolveClass(
    quoteToDeliveryType?: EnumQuoteToDeliveryConversionServiceType,
  ): Promise<IQuoteToDeliveryConversionService> {
    if (!quoteToDeliveryType) {
      quoteToDeliveryType = await this.getTypeFromDb()
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!quoteToDeliveryType) {
      throw new Error('Quote to delivery conversion type not set')
    }

    try {
      const implementation = await this.moduleRef.resolve(quoteToDeliveryType)

      // check if the implementation implements IQuoteToDeliveryConversionService
      if (!implementation.isValidDeliveryLocationDrift) {
        throw new Error(
          `Quote to delivery conversion type ${quoteToDeliveryType} does not implement IQuoteToDeliveryConversionService`,
        )
      }

      return implementation
    } catch (error) {
      throw new Error(
        `Quote to delivery conversion type not found for ${quoteToDeliveryType}. Please check QuoteToDeliveryConversionModule providers`,
      )
    }
  }

  async getTypeFromDb(): Promise<EnumQuoteToDeliveryConversionServiceType> {
    const quoteToDeliveryType =
      await this.configDomainService.instanceConfig.getQuoteToDeliveryConversionTypeSetting()
    if (Object.values(EnumQuoteToDeliveryConversionServiceType).indexOf(quoteToDeliveryType) < 0) {
      throw new Error(`Invalid default quote to delivery conversion type: ${quoteToDeliveryType}`)
    }

    return quoteToDeliveryType
  }
}
