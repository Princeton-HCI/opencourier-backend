import { Global, Module } from '@nestjs/common'
import { CourierDomainModule } from 'src/domains/courier/courier.domain.module'
import { PartnerDomainModule } from 'src/domains/partner/partner.domain.module'
import { DeliveryMatchingService } from './delivery-matching.service'
import { LocationDomainModule } from 'src/domains/location/location.domain.module'
import { CourierMatcherModule } from '../courier-matcher/courier-matcher.module'
import { CacheModule } from '../cache/cache.module'

@Global()
@Module({
  imports: [
    PartnerDomainModule,
    CourierDomainModule,
    LocationDomainModule,
    CourierMatcherModule.forRoot(),
    CacheModule,
  ],
  providers: [DeliveryMatchingService],
  exports: [DeliveryMatchingService],
})
export class DeliveryMatchingModule {}
