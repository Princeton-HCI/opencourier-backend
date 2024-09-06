import { Module } from '@nestjs/common'
import { AuthDomainModule } from '../../../domains/auth/auth.domain.module'
import { AuthCourierRestApiController } from './auth.courier.rest-api.controller'

@Module({
  imports: [AuthDomainModule],
  controllers: [AuthCourierRestApiController],
})
export class AuthCourierRestApiModule {}
