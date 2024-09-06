import { Injectable } from '@nestjs/common'
import { LocationNoteReaction } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { ILocationNoteReactionRepository } from 'src/domains/location-note-reaction/interfaces/ILocationNoteRepository'
import { ILocationNoteReactionCreate } from 'src/domains/location-note-reaction/interfaces/ILocationNoteReactionCreate'
import { LocationNoteReactionEntity } from 'src/domains/location-note-reaction/entities/location-note-reaction.entity'
import { ILocationNoteReactionUpdate } from 'src/domains/location-note-reaction/interfaces/ILocationNoteReactionUpdate'

@Injectable()
export class LocationNoteReactionRepository extends EntityRepository implements ILocationNoteReactionRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async getNoteFromCourier(locationNoteId: string, courierId: string) {
    const noteReaction = await this.prisma.locationNoteReaction.findFirst({
      where: {
        locationNoteId,
        courierId,
      },
    })

    return noteReaction ? this.toDomain(noteReaction) : null
  }

  async update(noteReactionId: string, updateData: ILocationNoteReactionUpdate) {
    const noteReaction = await this.prisma.locationNoteReaction.update({
      where: {
        id: noteReactionId,
      },
      data: updateData,
    })

    return this.toDomain(noteReaction)
  }

  async create(input: ILocationNoteReactionCreate) {
    const noteReaction = await this.prisma.locationNoteReaction.create({
      data: input,
    })

    return this.toDomain(noteReaction)
  }

  async delete(noteReactionId: string) {
    const noteReaction = await this.prisma.locationNoteReaction.delete({
      where: {
        id: noteReactionId,
      },
    })

    return this.toDomain(noteReaction)
  }

  private toDomain(data: LocationNoteReaction) {
    return new LocationNoteReactionEntity(data)
  }

  private toDomainMany(data: LocationNoteReaction[]) {
    return data.map((d) => this.toDomain(d))
  }
}
