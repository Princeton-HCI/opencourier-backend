import { Module } from '@nestjs/common'
import { DeliveryQuotePartnerRestApiController } from './delivery-quote.partner.rest-api.controller'
import { DeliveryQuoteDomainModule } from 'src/domains/delivery-quote/delivery-quote.domain.module'
import { PartnerDomainModule } from 'src/domains/partner/partner.domain.module'
import { DeliveryQuotePartnerRestApiService } from './delivery-quote.partner.rest-api.service'
import { LocationDomainModule } from 'src/domains/location/location.domain.module'

@Module({
  providers: [DeliveryQuotePartnerRestApiService],
  exports: [DeliveryQuotePartnerRestApiService],
  imports: [DeliveryQuoteDomainModule, PartnerDomainModule, LocationDomainModule],
  controllers: [DeliveryQuotePartnerRestApiController],
})
export class DeliveryQuotePartnerRestApiModule {}
