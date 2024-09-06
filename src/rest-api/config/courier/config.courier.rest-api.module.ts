import { Module } from '@nestjs/common'
import { ConfigDomainModule } from '../../../domains/config/config.domain.module'
import { ConfigCourierRestApiController } from './config.courier.rest-api.controller'

@Module({
  imports: [ConfigDomainModule],
  controllers: [ConfigCourierRestApiController],
})
export class ConfigCourierRestApiModule {}
