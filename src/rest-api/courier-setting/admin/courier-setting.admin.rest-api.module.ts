import { Module } from '@nestjs/common'
import { CourierSettingDomainModule } from 'src/domains/courier-setting/courier-setting.domain.module'
import { CourierSettingAdminRestApiController } from './courier-setting.admin.rest-api.controller'

@Module({
  imports: [CourierSettingDomainModule],
  controllers: [CourierSettingAdminRestApiController],
})
export class CourierSettingAdminRestApiModule {}
