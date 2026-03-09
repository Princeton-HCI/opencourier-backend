import { Module } from '@nestjs/common'
import { ManualRequestAdminRestApiController } from './manual-request.admin.rest-api.controller'
import { ManualRequestAdminRestApiService } from './manual-request.admin.rest-api.service'
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module'
import { DeliveryQuoteDomainModule } from 'src/domains/delivery-quote/delivery-quote.domain.module'
import { LocationDomainModule } from 'src/domains/location/location.domain.module'
import { PartnerDomainModule } from 'src/domains/partner/partner.domain.module'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'

@Module({
  imports: [
    DeliveryDomainModule,
    DeliveryQuoteDomainModule,
    LocationDomainModule,
    PartnerDomainModule,
    ConfigDomainModule,
  ],
  controllers: [ManualRequestAdminRestApiController],
  providers: [ManualRequestAdminRestApiService],
  exports: [ManualRequestAdminRestApiService],
})
export class ManualRequestAdminRestApiModule {}
