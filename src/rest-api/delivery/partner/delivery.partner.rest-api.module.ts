import { Module } from '@nestjs/common'
import { DeliveryQuoteDomainModule } from 'src/domains/delivery-quote/delivery-quote.domain.module';
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module';
import { DeliveryPartnerRestApiService } from './delivery.partner.rest-api.service';
import { DeliveryPartnerRestApiController } from './delivery.partner.rest-api.controller';
import { PartnerDomainModule } from 'src/domains/partner/partner.domain.module';
import { LocationDomainModule } from 'src/domains/location/location.domain.module';
import { CourierDomainModule } from 'src/domains/courier/courier.domain.module';
import { QuoteToDeliveryConversionModule } from 'src/services/quote-to-delivery-conversion/quote-to-delivery-conversion.module';

@Module({
  providers: [DeliveryPartnerRestApiService],
  exports: [DeliveryPartnerRestApiService],
  imports: [
    DeliveryDomainModule,
    DeliveryQuoteDomainModule,
    PartnerDomainModule,
    LocationDomainModule,
    CourierDomainModule,
    QuoteToDeliveryConversionModule.forRoot(),
  ],
  controllers: [DeliveryPartnerRestApiController],
})
export class DeliveryPartnerRestApiModule {}
