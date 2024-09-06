import { Module } from '@nestjs/common'
import { AuthDomainModule } from '../../../domains/auth/auth.domain.module'
import { AuthAdminRestApiController } from './auth.admin.rest-api.controller'

@Module({
  imports: [AuthDomainModule],
  controllers: [AuthAdminRestApiController],
})
export class AuthAdminRestApiModule {}
