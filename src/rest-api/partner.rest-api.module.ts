import { Module } from '@nestjs/common'
import { ConfigPartnerRestApiModule } from './config/partner/config.partner.rest-api.module'
import { DeliveryQuotePartnerRestApiModule } from './delivery-quote/partner/delivery-quote.partner.rest-api.module'
import { DeliveryPartnerRestApiModule } from './delivery/partner/delivery.partner.rest-api.module'
import { AuthPartnerRestApiModule } from './auth/partner/auth.partner.rest-api.module'

@Module({
  imports: [
    AuthPartnerRestApiModule,
    ConfigPartnerRestApiModule,
    DeliveryQuotePartnerRestApiModule,
    DeliveryPartnerRestApiModule,
  ],
})
export class PartnerRestApiModule {}
