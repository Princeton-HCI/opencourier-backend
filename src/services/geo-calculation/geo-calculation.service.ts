import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { IGeoCalculationInput } from './interfaces/IGeoCalculationInput'
import { IGeoCalculationService } from './interfaces/IGeoCalculationService'
import { ModuleRef } from '@nestjs/core'
import { EnumGeoCalculationType } from 'src/shared-types/index'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GeoCalculationService implements IGeoCalculationService {
  constructor(private readonly moduleRef: ModuleRef, private configDomainService: ConfigDomainService) {}

  async calculateDistance(input: IGeoCalculationInput, geoCalculationType?: EnumGeoCalculationType): Promise<number> {
    const implementation = await this.resolveClass(geoCalculationType)

    return implementation.calculateDistance(input)
  }

  private async resolveClass(geoCalculationType?: EnumGeoCalculationType): Promise<IGeoCalculationService> {
    if (!geoCalculationType) {
      geoCalculationType = await this.getCalculationTypeFromDB()
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!geoCalculationType) {
      throw new Error('Quote calculation type not set')
    }

    try {
      const implementation = await this.moduleRef.resolve(geoCalculationType)

      // check if the implementation implements IGeoCalculationService
      if (!implementation.calculateDistance) {
        throw new Error(`Calculation type ${geoCalculationType} does not implement IGeoCalculationService`)
      }

      return implementation
    } catch (error) {
      throw new Error(
        `Calculation type not found for ${geoCalculationType}. Please check GeoCalculationModule providers`
      )
    }
  }

  async getCalculationTypeFromDB(): Promise<EnumGeoCalculationType> {
    const geoCalculationType = await this.configDomainService.instanceConfig.getGeoCalculationTypeSetting()
    if (Object.values(EnumGeoCalculationType).indexOf(geoCalculationType) < 0) {
      throw new Error(`Invalid default geo calculation type: ${geoCalculationType}`)
    }

    return geoCalculationType
  }
}
