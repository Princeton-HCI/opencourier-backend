import { Module } from '@nestjs/common'
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module';
import { TestingPartnerRestApiController } from './testing.partner.rest-api.controller';

@Module({
  imports: [
    DeliveryDomainModule,
  ],
  controllers: [TestingPartnerRestApiController],
})
export class TestingPartnerRestApiModule {}
