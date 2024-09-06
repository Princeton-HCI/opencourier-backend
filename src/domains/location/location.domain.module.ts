import { Module } from '@nestjs/common'
import { LocationDomainService } from './location.domain.service'

@Module({
  providers: [LocationDomainService],
  exports: [LocationDomainService],
})
export class LocationDomainModule {}
