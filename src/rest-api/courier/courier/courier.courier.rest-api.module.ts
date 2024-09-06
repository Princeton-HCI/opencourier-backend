import { Module } from '@nestjs/common'
import { CourierCourierRestApiController } from './courier.courier.rest-api.controller'
import { CourierDomainModule } from '../../../domains/courier/courier.domain.module'

@Module({
  imports: [CourierDomainModule],
  controllers: [CourierCourierRestApiController],
})
export class CourierCourierRestApiModule {}
