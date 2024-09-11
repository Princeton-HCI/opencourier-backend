import { Injectable, Logger } from '@nestjs/common'
import { LocationNoteDomainService } from 'src/domains/location-note/location-note.domain.service'
import { ILocationNoteCreate } from 'src/domains/location-note/interfaces/ILocationNoteCreate'
import { LocationNoteWhereArgs } from 'src/domains/location-note/types/location-note-where-args.type'
import { LocationDomainService } from 'src/domains/location/location.domain.service'
import { DeliveryDomainService } from 'src/domains/delivery/delivery.domain.service'
import * as errors from 'src/errors'
import { EnumLocationNoteReactionType } from '@prisma/types'

@Injectable()
export class LocationNoteRestApiCourierService {
  private readonly logger = new Logger(LocationNoteRestApiCourierService.name)
  constructor(
    private locationNoteDomainService: LocationNoteDomainService,
    private deliveryDomainService: DeliveryDomainService,
    private locationDomainService: LocationDomainService,
  ) { }

  async create(input: ILocationNoteCreate) {
    if (input.deliveryId) {
      const delivery = await this.deliveryDomainService.getById(input.deliveryId);

      if (!delivery) {
        throw new errors.DeliveryNotFoundException('Delivery not found')
      }
    }

    if (input.locationId) {
      const location = await this.locationDomainService.getById(input.locationId);

      if (!location) {
        throw new errors.LocationNotFoundException('Location not found')
      }
    }

    const locationNote = await this.locationNoteDomainService.create(input)

    return locationNote
  }

  async update(noteId: string, note: string, courierId: string) {
    const locationNote = await this.locationNoteDomainService.findByIdOrThrow(noteId)

    if (locationNote.courierId !== courierId) {
      throw new errors.NotFoundException('Location note not found')
    }

    const updatedNote = await this.locationNoteDomainService.update(locationNote.id, note)

    return updatedNote
  }

  async addOrRemoveReaction(locationNoteId: string, courierId: string, reactionType: EnumLocationNoteReactionType) {
    const locationNote = await this.locationNoteDomainService.addOrRemoveReaction(locationNoteId, courierId, reactionType)

    return locationNote
  }

  async getById(deliveryId: string, courierId: string) {
    const locationNote = await this.locationNoteDomainService.getById(deliveryId)

    if (locationNote.courierId !== courierId) {
      throw new errors.NotFoundException('Location note not found');
    }

    return locationNote
  }

  async getMany(args: LocationNoteWhereArgs, page?: number, perPage?: number) {
    const locationNotes = await this.locationNoteDomainService.getMany(args, page, perPage)

    return locationNotes
  }

  async delete(noteId: string, courierId: string) {
    const locationNotes = await this.locationNoteDomainService.getById(noteId)

    if (locationNotes.courierId !== courierId) {
      throw new errors.NotFoundException('Location note not found')
    }

    return await this.locationNoteDomainService.delete(noteId)
  }
}
