import { ApiProperty } from '@nestjs/swagger'
import { EnumLocationNoteReactionType } from '@prisma/types'
import { LocationNoteReactionEntity } from 'src/domains/location-note-reaction/entities/location-note-reaction.entity'

export class LocationNoteReactionCourierDto implements Partial<LocationNoteReactionEntity> {
  @ApiProperty({ type: String })
  id!: string

  @ApiProperty({ enum: EnumLocationNoteReactionType })
  reaction: EnumLocationNoteReactionType

  @ApiProperty({ type: String })
  locationNoteId: string

  @ApiProperty({ type: String })
  courierId: string

  @ApiProperty({ type: Date })
  createdAt: Date

  constructor(data: LocationNoteReactionEntity) {
    this.id = data.id
    this.reaction = data.reaction
    this.locationNoteId = data.locationNoteId
    this.courierId = data.courierId

    this.createdAt = data.createdAt
  }
}
