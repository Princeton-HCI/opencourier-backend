import { Module } from '@nestjs/common'
import { ConfigDomainModule } from '../../../domains/config/config.domain.module'
import { ConfigPartnerRestApiController } from './config.partner.rest-api.controller'

@Module({
  imports: [ConfigDomainModule],
  controllers: [ConfigPartnerRestApiController],
})
export class ConfigPartnerRestApiModule {}
