import { Module } from '@nestjs/common'
import { LocationNoteDomainService } from './location-note.domain.service'

@Module({
	providers: [LocationNoteDomainService],
  exports: [LocationNoteDomainService],
})
export class LocationNoteDomainModule {}
