import { Injectable } from '@nestjs/common'
import { Delivery, Prisma } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { createPaginator } from '../../rest-api/Paginator'
import { IDeliveryRepository } from 'src/domains/delivery/interfaces/IDeliveryRepository'
import { DeliveryWhereArgs } from 'src/domains/delivery/types/delivery-where-args.type'
import { DeliveryWhereUniqueArgs } from 'src/domains/delivery/types/delivery-where-unique-args.type'
import { IDeliveryUpdate } from 'src/domains/delivery/interfaces/IDeliveryUpdate'
import { DeliveryEntity } from 'src/domains/delivery/entities/delivery.entity'
import { IDeliveryCreate } from 'src/domains/delivery/interfaces/IDeliveryCreate'

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
        // ...otherFilters, TODO: Courier delivery by id should allow courier to fetch pending deliveries, use `matchedCourierId` prop to filter.
      } as DeliveryWhereUniqueArgs,
    })

    return this.toDomain(delivery)
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
      },
      { page, perPage }
    )

    return {
      ...result,
      data: this.toDomainMany(result.data),
    }
  }

  private toDomain(data: Delivery) {
    return new DeliveryEntity(data)
  }

  private toDomainMany(data: Delivery[]) {
    return data.map((d) => this.toDomain(d))
  }
}
