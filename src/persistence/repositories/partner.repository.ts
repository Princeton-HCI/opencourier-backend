import { Injectable } from '@nestjs/common'
import { Partner } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { IPartnerRepository } from 'src/domains/partner/interfaces/IPartnerRepository'
import { PartnerEntity } from 'src/domains/partner/entities/partner.entity'

@Injectable()
export class PartnerRepository extends EntityRepository implements IPartnerRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async findById(partnerId: string) {
    const result = await this.prisma.partner.findUnique({
      where: {
        id: partnerId,
      },
    })

    return result ? this.toDomain(result) : null
  }

  async findByIdOrThrow(partnerId: string) {
    const result = await this.prisma.partner.findUniqueOrThrow({
      where: {
        id: partnerId,
      },
    })

    return this.toDomain(result)
  }

  async findByUserIdOrThrow(userId: string) {
    const result = await this.prisma.partner.findFirstOrThrow({
      where: {
        userId,
      },
    })

    return this.toDomain(result)
  }

  private toDomain(data: Partner) {
    return new PartnerEntity(data)
  }

  private toDomainMany(data: Partner[]) {
    return data.map((d) => this.toDomain(d))
  }
}
