import { Injectable } from '@nestjs/common'
import { DeliveryEvent } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { IDeliveryEventRepository } from 'src/domains/delivery-event/interfaces/IDeliveryEventRepository'
import { IDeliveryEventCreateInput } from 'src/domains/delivery-event/interfaces/IDeliveryEventCreateInput'
import { DeliveryEventEntity } from 'src/domains/delivery-event/entities/delivery-event.entity'

@Injectable()
export class DeliveryEventRepository extends EntityRepository implements IDeliveryEventRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async create(data: IDeliveryEventCreateInput) {
    const result = await this.prisma.deliveryEvent.create({ data })
    return this.toDomain(result)
  }

  private toDomain(data: DeliveryEvent) {
    return new DeliveryEventEntity(data)
  }

  private toDomainMany(data: DeliveryEvent[]) {
    return data.map((d) => this.toDomain(d))
  }
}
