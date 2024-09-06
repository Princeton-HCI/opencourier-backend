import { Module } from '@nestjs/common'
import { AuthDomainModule } from '../../../domains/auth/auth.domain.module'
import { AuthPartnerRestApiController } from './auth.partner.rest-api.controller'

@Module({
  imports: [AuthDomainModule],
  controllers: [AuthPartnerRestApiController],
})
export class AuthPartnerRestApiModule {}
