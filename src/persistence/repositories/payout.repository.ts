import { Injectable } from '@nestjs/common'
import { Payout } from '@prisma/types'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { IPayoutRepository } from 'src/domains/payout/interfaces/IPartnerRepository'
import { PayoutEntity } from 'src/domains/payout/entities/payout.entity'

@Injectable()
export class PayoutRepository extends EntityRepository implements IPayoutRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  private toDomain(data: Payout) {
    return new PayoutEntity(data)
  }

  private toDomainMany(data: Payout[]) {
    return data.map((d) => this.toDomain(d))
  }
}
