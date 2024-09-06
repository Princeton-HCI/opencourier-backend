import { Module } from '@nestjs/common'
import { ConfigDomainService } from './config.domain.service'
import { InstanceConfigDomainService } from './instance-config.domain.service'

@Module({
  providers: [ConfigDomainService, InstanceConfigDomainService],
  exports: [ConfigDomainService],
})
export class ConfigDomainModule {}
