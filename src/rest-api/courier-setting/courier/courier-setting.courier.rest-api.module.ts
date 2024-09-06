import { Module } from '@nestjs/common'
import { CourierSettingDomainModule } from 'src/domains/courier-setting/courier-setting.domain.module'
import { CourierSettingCourierRestApiController } from './courier-setting.courier.rest-api.controller'

@Module({
  imports: [CourierSettingDomainModule],
  controllers: [CourierSettingCourierRestApiController],
})
export class CourierSettingCourierRestApiModule {}
