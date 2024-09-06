import { Module } from '@nestjs/common'
import { CourierAdminRestApiController } from './courier.admin.rest-api.controller';
import { CourierDomainModule } from '../../../domains/courier/courier.domain.module';

@Module({
  imports: [CourierDomainModule],
  controllers: [CourierAdminRestApiController],
})
export class CourierAdminRestApiModule {}
