import { Module } from '@nestjs/common'
import { TestingAdminRestApiModule } from './testing/admin/testing.admin.rest-api.module'
import { TestingCourierRestApiModule } from './testing/courier/testing.partner.rest-api.module'
import { TestingPartnerRestApiModule } from './testing/partner/testing.partner.rest-api.module'

@Module({
  imports: [TestingAdminRestApiModule, TestingCourierRestApiModule, TestingPartnerRestApiModule],
})
export class TestingRestApiModule {}
