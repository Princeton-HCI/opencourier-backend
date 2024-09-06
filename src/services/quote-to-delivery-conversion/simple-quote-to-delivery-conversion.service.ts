import { Injectable, Logger } from '@nestjs/common'
import { IDeliveryAddressDriftCalculationInput } from './interfaces/IDeliveryAddressDriftCalculationInput'
import { GeoCalculationService } from '../geo-calculation/geo-calculation.service'
import { IQuoteToDeliveryConversionService } from './interfaces/IQuoteToDeliveryConversionService'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { EnvVarMissingException } from 'src/errors'

@Injectable()
export class SimpleQuoteToDeliveryConversionService implements IQuoteToDeliveryConversionService {
  private readonly logger = new Logger(SimpleQuoteToDeliveryConversionService.name)

  constructor(
    private readonly configDomainService: ConfigDomainService,
    private readonly geoCalculationService: GeoCalculationService
  ) {}

  async isValidDeliveryLocationDrift(input: IDeliveryAddressDriftCalculationInput) {
    const maxDriftDistance = await this.configDomainService.instanceConfig.getMaxDriftDistance()

    if (maxDriftDistance === null) {
      throw new EnvVarMissingException('maxDriftDistance env variable is required')
    }

    const { fromLocation, toLocation } = input

    // check if there is too much drift between the quote and the delivery pickup and dropoff locations
    // allow a maxDistance drift
    const distance = await this.geoCalculationService.calculateDistance({
      fromLocation,
      toLocation,
    })

    return Promise.resolve(distance <= maxDriftDistance)
  }
}
