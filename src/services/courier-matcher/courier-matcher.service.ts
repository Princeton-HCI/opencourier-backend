import { ModuleRef } from '@nestjs/core'
import { EnumCourierMatcherType } from 'src/shared-types/index'
import { ICourierMatcherInput } from './interfaces/ICourierMatcherInput'
import { ICourierMatcherResult } from './interfaces/ICourierMatcherResult'
import { ICourierMatcherService } from './interfaces/ICourierMatcherService'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'

@Injectable()
export class CourierMatcherService implements ICourierMatcherService {
  private readonly logger = new Logger(CourierMatcherService.name)

  private static staticMatcherType: EnumCourierMatcherType | null = null

  constructor(private readonly moduleRef: ModuleRef, private readonly configDomainService: ConfigDomainService) {}

  async findCourierForDelivery(
    input: ICourierMatcherInput,
    courierMatcherType?: EnumCourierMatcherType
  ): Promise<ICourierMatcherResult | null> {
    const matcher = await this.resolveMatcher(courierMatcherType)

    return matcher.findCourierForDelivery(input)
  }

  private async resolveMatcher(courierMatcherType?: EnumCourierMatcherType): Promise<ICourierMatcherService> {
    if (!courierMatcherType) {
      courierMatcherType = await this.getMatcherType()
    }

    this.logger.log(`Resolving matcher: ${courierMatcherType}`)

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!courierMatcherType) {
      throw new Error('Courier matcher type not set')
    }

    try {
      const matcher = await this.moduleRef.resolve(courierMatcherType)

      // check if the matcher implements ICourierMatcherService
      if (!matcher.findCourierForDelivery) {
        throw new Error(`Matcher ${courierMatcherType} does not implement ICourierMatcherService`)
      }

      return matcher
    } catch (error) {
      throw new Error(`Matcher not found for ${courierMatcherType}. Please check CourierMatcherModule providers`)
    }
  }

  async getMatcherType(): Promise<EnumCourierMatcherType> {
    if (CourierMatcherService.staticMatcherType) {
      this.logger.log(
        `Using static matcher from 'CourierMatcherService.staticMatcherType': ${CourierMatcherService.staticMatcherType}`
      )
      return CourierMatcherService.staticMatcherType
    }

    const courierMatcherType = await this.configDomainService.instanceConfig.getCourierMatcherTypeSetting()
    if (Object.values(EnumCourierMatcherType).indexOf(courierMatcherType) < 0) {
      this.logger.error(`Invalid default courier matcher type: ${courierMatcherType}`)
      throw new Error(`Invalid default courier matcher type: ${courierMatcherType}`)
    }

    return courierMatcherType
  }

  async temporarilySetStaticMatcher(courierMatcherType: EnumCourierMatcherType, callback: any): Promise<void> {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function')
    }

    this.logger.log(`Temporarily setting CourierMatcherType to: ${CourierMatcherService.staticMatcherType}`)
    CourierMatcherService.staticMatcherType = courierMatcherType

    const result = await callback()

    CourierMatcherService.staticMatcherType = null
    this.logger.log(`Resetting to db matcher`)

    return result
  }
}
