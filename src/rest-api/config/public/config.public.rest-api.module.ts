import { Module } from '@nestjs/common'
import { ConfigDomainModule } from '../../../domains/config/config.domain.module'
import { ConfigPublicRestApiController } from './config.public.rest-api.controller'

@Module({
  imports: [ConfigDomainModule],
  controllers: [ConfigPublicRestApiController],
})
export class ConfigPublicRestApiModule {}
