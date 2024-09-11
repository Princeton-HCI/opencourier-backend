import { Module } from '@nestjs/common'
import { LocationNoteReactionDomainService } from './location-note-reaction.domain.service'

@Module({
  providers: [LocationNoteReactionDomainService],
  exports: [LocationNoteReactionDomainService],
})
export class LocationNoteReactionDomainModule {}
