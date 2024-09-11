import { Injectable, Logger } from '@nestjs/common'
import { LocationNoteReactionRepository } from 'src/persistence/repositories/location-note-reaction.repository'

@Injectable()
export class LocationNoteReactionDomainService {
	private readonly logger = new Logger(LocationNoteReactionDomainService.name)
  constructor(
		private locationNoteReactionRepository: LocationNoteReactionRepository
	) {}


	async getCountsByNoteIds(noteIds: string[]) {
		const locationNotes = await this.locationNoteReactionRepository.findReactionCountsGrouppedByNoteIds(noteIds)

		return locationNotes
	}

	async getReactionByCourierOnNoteIds(noteIds: string[], courierId: string) {
		const locationNotes = await this.locationNoteReactionRepository.findReactionByCourierOnNoteIds(noteIds, courierId)

		return locationNotes
	}
}
