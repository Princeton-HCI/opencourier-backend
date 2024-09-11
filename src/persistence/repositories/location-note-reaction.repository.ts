import { Injectable } from '@nestjs/common'
import { EnumLocationNoteReactionType, LocationNoteReaction } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { ILocationNoteReactionRepository } from 'src/domains/location-note-reaction/interfaces/ILocationNoteRepository'
import { ILocationNoteReactionCreate } from 'src/domains/location-note-reaction/interfaces/ILocationNoteReactionCreate'
import { LocationNoteReactionEntity } from 'src/domains/location-note-reaction/entities/location-note-reaction.entity'
import { ILocationNoteReactionUpdate } from 'src/domains/location-note-reaction/interfaces/ILocationNoteReactionUpdate'

export type LocationNoteReactionCountsGrouppedByType = {
  upvotes: number;
  downvotes: number;
}

export type LocationNoteReactionCountsGrouppedByNoteId = {
  [noteId: string]: LocationNoteReactionCountsGrouppedByType
}

export type LocationNoteReactionFromCourier = {
  [noteId: string]: EnumLocationNoteReactionType | null
}

@Injectable()
export class LocationNoteReactionRepository extends EntityRepository implements ILocationNoteReactionRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async getNoteFromCourier(locationNoteId: string, courierId: string) {
    const noteReaction = await this.prisma.locationNoteReaction.findFirst({
      where: {
        locationNoteId,
        courierId
      }
    })

    return noteReaction ? this.toDomain(noteReaction) : null
  }

  async update(noteReactionId: string, updateData: ILocationNoteReactionUpdate) {
    const noteReaction = await this.prisma.locationNoteReaction.update({
      where: {
        id: noteReactionId
      },
      data: updateData
    })

    return this.toDomain(noteReaction)
  }

  async create(input: ILocationNoteReactionCreate) {
    const noteReaction = await this.prisma.locationNoteReaction.create({
      data: input
    })

    return this.toDomain(noteReaction)
  }

  async delete(noteReactionId: string) {
    const noteReaction = await this.prisma.locationNoteReaction.delete({
      where: {
        id: noteReactionId
      }
    })

    return this.toDomain(noteReaction)
  }

  async findReactionCountsGrouppedByNoteIds(noteIds: string[]) {
    const locationNotes = await this.prisma.locationNoteReaction.groupBy({
      by: ['locationNoteId', 'reaction'],
      _count: true,
      where: {
        locationNoteId: {
          in: noteIds
        },
        reaction: {
          in: [EnumLocationNoteReactionType.UPVOTE, EnumLocationNoteReactionType.DOWNVOTE]
        }
      }
    })

    if (locationNotes.length === 0) {
      return {}
    }

    const grouppedByNoteId = locationNotes.reduce((acc: any, note) => {
      if (!acc[note.locationNoteId]) {
        acc[note.locationNoteId] = {
          upvotes: 0,
          downvotes: 0
        }
      }

      if (note.reaction === EnumLocationNoteReactionType.UPVOTE) {
        acc[note.locationNoteId].upvotes = note._count
      } else {
        acc[note.locationNoteId].downvotes = note._count
      }

      return acc
    }, {})

    noteIds.forEach((noteId) => {
      if (!grouppedByNoteId[noteId]) {
        grouppedByNoteId[noteId] = {
          upvotes: 0,
          downvotes: 0
        }
      }
    })

    return grouppedByNoteId as LocationNoteReactionCountsGrouppedByNoteId;
  }

  async findReactionByCourierOnNoteIds(noteIds: string[], courierId: string) {
    const locationNotes = await this.prisma.locationNoteReaction.findMany({
      select: {
        id: true,
        reaction: true,
        locationNoteId: true
      },
      where: {
        locationNoteId: {
          in: noteIds
        },
        courierId,
        reaction: {
          in: [EnumLocationNoteReactionType.UPVOTE, EnumLocationNoteReactionType.DOWNVOTE]
        }
      }
    })

    const grouppedByNoteId = locationNotes.reduce((acc: any, note) => {
      acc[note.locationNoteId] = note.reaction

      return acc
    }, {})

    noteIds.forEach((noteId) => {
      if (!grouppedByNoteId[noteId]) {
        grouppedByNoteId[noteId] = null
      }
    })

    return grouppedByNoteId as LocationNoteReactionFromCourier;
  }

  private toDomain(data: LocationNoteReaction) {
    return new LocationNoteReactionEntity(data)
  }

  private toDomainMany(data: LocationNoteReaction[]) {
    return data.map((d) => this.toDomain(d))
  }
}
