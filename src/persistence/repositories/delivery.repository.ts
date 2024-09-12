import { Injectable } from '@nestjs/common'
import { Delivery, Location, Prisma } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { createPaginator } from '../../rest-api/Paginator'
import { IDeliveryRepository } from 'src/domains/delivery/interfaces/IDeliveryRepository'
import { DeliveryWhereArgs } from 'src/domains/delivery/types/delivery-where-args.type'
import { DeliveryWhereUniqueArgs } from 'src/domains/delivery/types/delivery-where-unique-args.type'
import { IDeliveryUpdate } from 'src/domains/delivery/interfaces/IDeliveryUpdate'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { IDeliveryCreate } from 'src/domains/delivery/interfaces/IDeliveryCreate'
import { DeliveryWithLocationsEntity } from 'src/domains/delivery/entities/delivery-with-locations.entity'

export type PrismaDeliveryWithLocations = Delivery & {
  pickupLocation: Location | null
  dropoffLocation: Location | null
}

@Injectable()
export class DeliveryRepository extends EntityRepository implements IDeliveryRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async create(input: IDeliveryCreate) {
    const delivery = await this.prisma.delivery.create({
      data: input,
    })

    return this.toDomain(delivery)
  }

  async update(deliveryId: string, input: IDeliveryUpdate) {
    const delivery = await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: input,
    })

    return this.toDomain(delivery)
  }

  async findById(deliveryId: string, otherFilters?: DeliveryWhereArgs) {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id: deliveryId,
        ...otherFilters,
      } as DeliveryWhereUniqueArgs,
    })

    return delivery ? this.toDomain(delivery) : null
  }

  async findByDeliveryQuoteId(deliveryQuoteId: string) {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        deliveryQuoteId: deliveryQuoteId,
      },
    })

    return delivery ? this.toDomain(delivery) : null
  }

  async findByIdOrThrow(deliveryId: string, otherFilters?: DeliveryWhereArgs) {
    const delivery = await this.prisma.delivery.findUniqueOrThrow({
      where: {
        id: deliveryId,
        ...otherFilters,
      } as DeliveryWhereUniqueArgs,
    })

    return this.toDomain(delivery)
  }

  async findByIdOrThrowWithLocations(deliveryId: string, otherFilters?: DeliveryWhereArgs) {
    const delivery = await this.prisma.delivery.findUniqueOrThrow({
      where: {
        id: deliveryId,
        ...otherFilters,
      } as DeliveryWhereUniqueArgs,
      include: {
        pickupLocation: true,
        dropoffLocation: true,
      },
    })

    return new DeliveryWithLocationsEntity(delivery)
  }

  async findManyPaginated(args: DeliveryWhereArgs, page?: number, perPage?: number) {
    const paginator = createPaginator<Delivery, Prisma.DeliveryFindManyArgs, Prisma.DeliveryDelegate>()

    const result = await paginator(
      this.prisma.delivery,
      {
        where: {
          ...args,
        },
        orderBy: { createdAt: 'desc' },
        include: {
          pickupLocation: true,
          dropoffLocation: true,
        },
      },
      { page, perPage }
    )

    return {
      ...result,
      data: result.data.map((d) => new DeliveryWithLocationsEntity(d as PrismaDeliveryWithLocations)),
    }
  }

  private toDomain(data: Delivery) {
    return new DeliveryEntity(data)
  }

  private toDomainMany(data: Delivery[]) {
    return data.map((d) => this.toDomain(d))
  }
}
