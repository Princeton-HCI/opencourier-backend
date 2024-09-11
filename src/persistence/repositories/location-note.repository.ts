import { Injectable } from '@nestjs/common'
import { LocationNote, Prisma } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { createPaginator } from '../../rest-api/Paginator'
import { LocationNoteWhereArgs } from 'src/domains/location-note/types/location-note-where-args.type'
import { ILocationNoteRepository } from 'src/domains/location-note/interfaces/ILocationNoteRepository'
import { LocationNoteEntity } from 'src/domains/location-note/entities/location-note.entity'
import { LocationNoteWhereUniqueArgs } from 'src/domains/location-note/types/location-note-where-unique-args.type'
import { ILocationNoteCreate } from 'src/domains/location-note/interfaces/ILocationNoteCreate'
import { PaginatedResult } from 'src/core/models/Pagination'

@Injectable()
export class LocationNoteRepository extends EntityRepository implements ILocationNoteRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async create(input: ILocationNoteCreate) {
    const locationNote = await this.prisma.locationNote.create({
      data: input
    })

    return this.toDomain(locationNote)
  }

  async update(noteId: string, note: string) {
    const locationNote = await this.prisma.locationNote.update({
      where: {
        id: noteId
      },
      data: {
        note: note
      }
    })

    return this.toDomain(locationNote)
  }

  async findByIdOrThrow(locationNoteId: string, otherFilters?: LocationNoteWhereArgs) {
    const locationNote = await this.prisma.locationNote.findUniqueOrThrow({
      where: {
        id: locationNoteId,
        ...otherFilters
      } as LocationNoteWhereUniqueArgs
    })

    return this.toDomain(locationNote)
  }

  async findManyPaginated(args: LocationNoteWhereArgs, page?: number, perPage?: number): Promise<PaginatedResult<LocationNoteEntity>> {
    const paginator = createPaginator<LocationNote, Prisma.LocationNoteFindManyArgs, Prisma.LocationNoteDelegate>()

    const result = await paginator(this.prisma.locationNote, {
      where: {
        ...args
      }, orderBy: { createdAt: 'desc' }
    }, { page, perPage })

    return {
      ...result,
      data: this.toDomainMany(result.data),
    }
  }

  async findManyByLocationIds(ids: string[]): Promise<LocationNoteEntity[]> {
    const locationNotes = await this.prisma.locationNote.findMany({
      where: {
        locationId: {
          in: ids
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        noteReactions: true
      }
    })

    return this.toDomainMany(locationNotes)
  }

  async delete(locationNoteId: string) {
    const result = await this.prisma.locationNote.delete({
      where: {
        id: locationNoteId
      },
    })

    return result
  }

  private toDomain(data: LocationNote) {
    return new LocationNoteEntity(data)
  }

  private toDomainMany(data: LocationNote[]) {
    return data.map((d) => this.toDomain(d))
  }
}
