import { ApiProperty } from '@nestjs/swagger'
import { EnumLocationNoteActor, EnumLocationNoteReactionType } from '@prisma/types'
import { LocationNoteEntity } from 'src/domains/location-note/entities/location-note.entity'
import { LocationNoteWithReactionCounts } from 'src/rest-api/delivery/courier/types/location-note-with-reaction-counts.type'

export class LocationNoteCourierWithReactionCountsDto implements Partial<LocationNoteEntity> {
  @ApiProperty({ type: String })
  id!: string

	@ApiProperty({ type: String, nullable: true })
	note: string | null
	
	@ApiProperty({ type: String, nullable: true })
	locationId: string | null
	
	@ApiProperty({ type: String, nullable: true })
	deliveryId: string | null

	@ApiProperty({ type: String, nullable: true })
	courierId: string | null

	@ApiProperty({ enum: EnumLocationNoteActor })
	actor: EnumLocationNoteActor;

	@ApiProperty({ type: Number })
	upvotes: number;

	@ApiProperty({ type: Number })
	downvotes: number;

	@ApiProperty({ enum: EnumLocationNoteReactionType, nullable: true })
	currentCourierReaction: EnumLocationNoteReactionType | null;

	@ApiProperty({ type: Date })
	createdAt: Date
	
	constructor(data: LocationNoteWithReactionCounts) {
		this.id = data.id;
		this.note = data.note;
		this.courierId = data.courierId;
		this.actor = data.actor;
		this.locationId = data.locationId;
		this.deliveryId = data.deliveryId;

		this.upvotes = data.upvotes;
		this.downvotes = data.downvotes;

		this.currentCourierReaction = data.currentCourierReaction;

		this.createdAt = data.createdAt;
  }
}
