import { Module } from '@nestjs/common'
import { CourierSettingDomainService } from './courier-setting.domain.service'

@Module({
  providers: [CourierSettingDomainService],
  exports: [CourierSettingDomainService],
})
export class CourierSettingDomainModule {}
