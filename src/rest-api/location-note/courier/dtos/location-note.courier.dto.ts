import { ApiProperty } from '@nestjs/swagger'
import { EnumLocationNoteActor } from '@prisma/types'
import { LocationNoteEntity } from 'src/domains/location-note/entities/location-note.entity'

export class LocationNoteCourierDto implements Partial<LocationNoteEntity> {
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
  actor: EnumLocationNoteActor

  @ApiProperty({ type: Date })
  createdAt: Date

  constructor(data: LocationNoteEntity) {
    this.id = data.id
    this.note = data.note
    this.courierId = data.courierId
    this.actor = data.actor
    this.locationId = data.locationId
    this.deliveryId = data.deliveryId

    this.createdAt = data.createdAt
  }
}
