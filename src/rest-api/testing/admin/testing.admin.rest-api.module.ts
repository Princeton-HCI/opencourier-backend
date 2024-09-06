import { Module } from '@nestjs/common'
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module'
import { TestingAdminRestApiController } from './testing.admin.rest-api.controller'
import { PartnerDomainModule } from 'src/domains/partner/partner.domain.module'
import { DeliveryQuoteDomainModule } from 'src/domains/delivery-quote/delivery-quote.domain.module'
import { TestingAdminRestApiService } from './testing.admin.rest-api.service'
import { LocationDomainModule } from 'src/domains/location/location.domain.module'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'
import { CourierMatcherModule } from 'src/services/courier-matcher/courier-matcher.module'

@Module({
  imports: [
    DeliveryDomainModule,
    PartnerDomainModule,
    DeliveryQuoteDomainModule,
    LocationDomainModule,
    ConfigDomainModule,
    CourierMatcherModule.forRoot(),
  ],
  controllers: [TestingAdminRestApiController],
  providers: [TestingAdminRestApiService],
  exports: [TestingAdminRestApiService],
})
export class TestingAdminRestApiModule {}
