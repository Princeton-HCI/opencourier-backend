import { Module } from '@nestjs/common'
import { DeliveryDomainModule } from '../../../domains/delivery/delivery.domain.module';
import { DeliveryAdminRestApiController } from './delivery.admin.rest-api.controller';

@Module({
  imports: [DeliveryDomainModule],
  controllers: [DeliveryAdminRestApiController],
})
export class DeliveryAdminRestApiModule {}
