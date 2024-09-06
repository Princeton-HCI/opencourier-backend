import { Injectable } from '@nestjs/common'
import { DeliveryQuote, Prisma } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { createPaginator } from '../../rest-api/Paginator'
import { IDeliveryQuoteRepository } from 'src/domains/delivery-quote/interfaces/IDeliveryQuoteRepository'
import { DeliveryQuoteWhereArgs } from 'src/domains/delivery-quote/types/delivery-quote-where-args.type'
import { DeliveryQuoteWhereUniqueArgs } from 'src/domains/delivery-quote/types/delivery-quote-where-unique-args.type'
import { DeliveryQuoteEntity } from 'src/domains/delivery-quote/entities/delivery-quote.entity'
import { IDeliveryQuoteCreate } from 'src/domains/delivery-quote/interfaces/IDeliveryQuoteCreate'
import { Exact } from 'src/types'
@Injectable()
export class DeliveryQuoteRepository extends EntityRepository implements IDeliveryQuoteRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async create(data: Exact<IDeliveryQuoteCreate>) {
    const deliveryQuote = await this.prisma.deliveryQuote.create({
      data: {
        ...data,
      },
    })

    return this.toDomain(deliveryQuote)
  }

  async findById(deliveryQuoteId: string, otherFilters?: DeliveryQuoteWhereArgs) {
    const deliveryQuote = await this.prisma.deliveryQuote.findUnique({
      where: {
        id: deliveryQuoteId,
        ...otherFilters,
      } as DeliveryQuoteWhereUniqueArgs,
    })

    return deliveryQuote ? this.toDomain(deliveryQuote) : null
  }

  async findByIdOrThrow(deliveryQuoteId: string, otherFilters?: DeliveryQuoteWhereArgs) {
    const deliveryQuote = await this.prisma.deliveryQuote.findUniqueOrThrow({
      where: {
        id: deliveryQuoteId,
        ...otherFilters,
      } as DeliveryQuoteWhereUniqueArgs,
    })

    return this.toDomain(deliveryQuote)
  }

  async findManyPaginated(args: DeliveryQuoteWhereArgs, page?: number, perPage?: number) {
    const paginator = createPaginator<DeliveryQuote, Prisma.DeliveryQuoteFindManyArgs, Prisma.DeliveryQuoteDelegate>()

    const result = await paginator(
      this.prisma.deliveryQuote,
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

  private toDomain(data: DeliveryQuote) {
    return new DeliveryQuoteEntity(data)
  }

  private toDomainMany(data: DeliveryQuote[]) {
    return data.map((d) => this.toDomain(d))
  }
}
