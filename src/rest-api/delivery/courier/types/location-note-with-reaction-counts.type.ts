import { EnumLocationNoteActor, EnumLocationNoteReactionType, LocationNote } from '@prisma/types'
import { LocationNoteEntity } from 'src/domains/location-note/entities/location-note.entity'

export class LocationNoteWithReactionCounts implements LocationNoteEntity {
  id: string
  note: string | null
  locationId: string | null
  deliveryId: string | null
  actor: EnumLocationNoteActor;
  
  courierId: string | null

	upvotes: number;
	downvotes: number;

  currentCourierReaction: EnumLocationNoteReactionType | null

  createdAt: Date
  updatedAt: Date

  constructor(data: LocationNote, upvotes: number, downvotes: number, currentCourierReaction: EnumLocationNoteReactionType | null) {
    this.id = data.id;
    this.note = data.note;
    this.actor = data.actor;
    this.courierId = data.courierId;
    this.locationId = data.locationId;
    this.deliveryId = data.deliveryId;

		this.upvotes = upvotes;
		this.downvotes = downvotes;

    this.currentCourierReaction = currentCourierReaction;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
