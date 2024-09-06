import { Module } from '@nestjs/common'
import { AuthAdminRestApiModule } from './auth/admin/auth.admin.rest-api.module'
import { CourierAdminRestApiModule } from './courier/admin/courier.admin.rest-api.module'
import { CourierSettingAdminRestApiModule } from './courier-setting/admin/courier-setting.admin.rest-api.module'
import { DeliveryAdminRestApiModule } from './delivery/admin/delivery.admin.rest-api.module'
import { LocationAdminRestApiModule } from './location/admin/location.admin.rest-api.module'
import { ConfigAdminRestApiModule } from './config/admin/config.admin.rest-api.module'

@Module({
  imports: [
    AuthAdminRestApiModule,
    CourierAdminRestApiModule,
    CourierSettingAdminRestApiModule,
    DeliveryAdminRestApiModule,
    LocationAdminRestApiModule,
    ConfigAdminRestApiModule,
  ],
})
export class AdminRestApiModule {}
