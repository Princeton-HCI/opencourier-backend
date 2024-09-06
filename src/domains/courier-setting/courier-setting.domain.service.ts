import { Injectable, Logger } from '@nestjs/common'
import { CourierSettingRepository } from 'src/persistence/repositories/courier-setting.repository'
import { ICourierSettingUpdate } from './interfaces/ICourierSettingUpdate'

@Injectable()
export class CourierSettingDomainService {
  private readonly logger = new Logger(CourierSettingDomainService.name)
  constructor(private courierSettingRepository: CourierSettingRepository) {}

  async getByCourierId(courierId: string) {
    const courierSettings = await this.courierSettingRepository.findByCourierId(courierId)

    return courierSettings
  }

  async getByCourierIdOrThrow(courierId: string) {
    const courierSettings = await this.courierSettingRepository.findByCourierIdOrThrow(courierId)

    return courierSettings
  }

  async updateOrCreateByCourierId(courierId: string, data: ICourierSettingUpdate) {
    const courierSettings = await this.courierSettingRepository.updateOrCreateByCourierId(courierId, data)

    return courierSettings
  }
}
