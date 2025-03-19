import { Module } from '@nestjs/common';
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module';
import { TestingPartnerRestApiController } from './testing.partner.rest-api.controller';
import { CourierDomainModule } from 'src/domains/courier/courier.domain.module';
import { LocationDomainModule } from 'src/domains/location/location.domain.module';
import { CourierMatcherModule } from 'src/services/courier-matcher/courier-matcher.module';
import { CacheModule } from 'src/services/cache/cache.module';
import { DeliveryMatchingModule } from 'src/services/delivery-matching/delivery-matching.module';
import { PersistenceModule } from 'src/persistence/persistence.module';

@Module({
  imports: [
    DeliveryDomainModule,
    CourierDomainModule,
    LocationDomainModule,
    CourierMatcherModule.forRoot(), 
    CacheModule,
    DeliveryMatchingModule,
    PersistenceModule,
  ],
  controllers: [TestingPartnerRestApiController],
  providers: [],
})
export class TestingPartnerRestApiModule {}