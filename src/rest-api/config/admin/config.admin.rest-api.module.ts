import { Module } from '@nestjs/common'
import { ConfigDomainModule } from '../../../domains/config/config.domain.module'
import { ConfigAdminRestApiController } from './config.admin.rest-api.controller'

@Module({
  imports: [ConfigDomainModule],
  controllers: [ConfigAdminRestApiController],
})
export class ConfigAdminRestApiModule {}
