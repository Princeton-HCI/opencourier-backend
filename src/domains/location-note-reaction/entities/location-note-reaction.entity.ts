import { EnumLocationNoteReactionType, LocationNoteReaction } from '@prisma/types'

export class LocationNoteReactionEntity implements LocationNoteReaction {
  id: string
  reaction: EnumLocationNoteReactionType
  createdAt: Date
  updatedAt: Date
  locationNoteId: string
  courierId: string

  constructor(data: LocationNoteReaction) {
    this.id = data.id
    this.reaction = data.reaction
    this.locationNoteId = data.locationNoteId
    this.courierId = data.courierId

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
