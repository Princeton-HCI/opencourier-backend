import { Module } from '@nestjs/common'
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module';
import { TestingCourierRestApiController } from './testing.partner.rest-api.controller';

@Module({
  imports: [
    DeliveryDomainModule,
  ],
  controllers: [TestingCourierRestApiController],
})
export class TestingCourierRestApiModule {}
