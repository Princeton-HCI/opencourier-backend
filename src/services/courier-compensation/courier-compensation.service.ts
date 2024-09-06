import { Injectable, Logger } from '@nestjs/common'
import { ICourierCompensationService } from './interfaces/ICourierCompensationService'
import { ModuleRef } from '@nestjs/core'
import { ConfigDomainService } from 'src/domains/config/config.domain.service'
import { EnumCourierCompensationCalculationType } from 'src/shared-types/index'
import { ICourierCompensationForDeliveryInput } from './interfaces/ICourierCompensationForDeliveryInput'
import { ICourierCompensationInput } from './interfaces/ICourierCompensationInput'

@Injectable()
export class CourierCompensationService implements ICourierCompensationService {
  private readonly logger = new Logger(CourierCompensationService.name)

  constructor(private readonly moduleRef: ModuleRef, private configDomainService: ConfigDomainService) {}

  async calculateCourierCompensation(
    input: ICourierCompensationInput,
    courierCompensationType?: EnumCourierCompensationCalculationType
  ) {
    const implementation = await this.resolveClass(courierCompensationType)

    return implementation.calculateCourierCompensation(input)
  }

  async calculateCourierCompensationForDelivery(
    input: ICourierCompensationForDeliveryInput,
    courierCompensationType?: EnumCourierCompensationCalculationType
  ) {
    const implementation = await this.resolveClass(courierCompensationType)

    return implementation.calculateCourierCompensationForDelivery(input)
  }

  private async resolveClass(
    courierCompensationType?: EnumCourierCompensationCalculationType
  ): Promise<ICourierCompensationService> {
    if (!courierCompensationType) {
      courierCompensationType = await this.getTypeFromDb()
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!courierCompensationType) {
      throw new Error('Courier compensation calculation type not set')
    }

    try {
      const implementation = await this.moduleRef.resolve(courierCompensationType)

      // check if the implementation implements ICourierCompensationService
      if (!implementation.calculateCourierCompensation || !implementation.calculateCourierCompensationForDelivery) {
        throw new Error(
          `Courier compensation calculation type ${courierCompensationType} does not implement ICourierCompensationService`
        )
      }

      return implementation
    } catch (error) {
      throw new Error(
        `Courier compensation calculation type not found for ${courierCompensationType}. Please check DeliveryCourierCompensationModule providers`
      )
    }
  }

  async getTypeFromDb(): Promise<EnumCourierCompensationCalculationType> {
    const courierCompensationType = await this.configDomainService.instanceConfig.getCourierCompensationTypeSetting()
    if (Object.values(EnumCourierCompensationCalculationType).indexOf(courierCompensationType) < 0) {
      throw new Error(`Invalid default quote to delivery conversion type: ${courierCompensationType}`)
    }

    return courierCompensationType
  }
}
