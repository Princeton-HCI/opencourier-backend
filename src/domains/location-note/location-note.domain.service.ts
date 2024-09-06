import { Injectable, Logger } from '@nestjs/common'
import { LocationNoteRepository } from 'src/persistence/repositories/location-note.repository'
import { LocationNoteWhereArgs } from './types/location-note-where-args.type'
import { ILocationNoteCreate } from './interfaces/ILocationNoteCreate'
import { LocationNoteReactionRepository } from 'src/persistence/repositories/location-note-reaction.repository'
import { EnumLocationNoteReactionType } from '@prisma/types'

@Injectable()
export class LocationNoteDomainService {
  private readonly logger = new Logger(LocationNoteDomainService.name)
  constructor(
    private locationNoteRepository: LocationNoteRepository,
    private locationNoteReactionRepository: LocationNoteReactionRepository
  ) {}

  async create(input: ILocationNoteCreate) {
    const locationNote = await this.locationNoteRepository.create(input)

    return locationNote
  }

  async addOrRemoveReaction(locationNoteId: string, courierId: string, reactionType: EnumLocationNoteReactionType) {
    const reactionByCourier = await this.locationNoteReactionRepository.getNoteFromCourier(locationNoteId, courierId)

    if (reactionByCourier) {
      if (reactionByCourier.reaction === reactionType) {
        return await this.locationNoteReactionRepository.delete(reactionByCourier.id)
      }

      const updatedReaction = await this.locationNoteReactionRepository.update(reactionByCourier.id, {
        reaction: reactionType,
      })

      return updatedReaction
    }

    const locationNote = await this.locationNoteReactionRepository.create({
      locationNoteId,
      courierId,
      reaction: reactionType,
    })

    return locationNote
  }

  async getById(locationNoteId: string) {
    const locationNote = await this.locationNoteRepository.findByIdOrThrow(locationNoteId)

    return locationNote
  }

  async getMany(args: LocationNoteWhereArgs, page?: number, perPage?: number) {
    const locationNotes = await this.locationNoteRepository.findManyPaginated(args, page, perPage)

    return locationNotes
  }

  async getManyByLocationIds(locationIds: string[]) {
    const locationNotes = await this.locationNoteRepository.findManyByLocationIds(locationIds)

    return locationNotes
  }
}
