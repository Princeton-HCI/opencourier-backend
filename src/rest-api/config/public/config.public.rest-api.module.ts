import { Module } from '@nestjs/common'
import { ConfigDomainModule } from '../../../domains/config/config.domain.module'
import { UserDomainModule } from 'src/domains/user/user.domain.module'
import { ConfigPublicRestApiController } from './config.public.rest-api.controller'
import { InstanceDetailsPublicRestApiController } from './instance-details.public.rest-api.controller'

@Module({
  imports: [ConfigDomainModule, UserDomainModule],
  controllers: [ConfigPublicRestApiController, InstanceDetailsPublicRestApiController],
})
export class ConfigPublicRestApiModule {}
