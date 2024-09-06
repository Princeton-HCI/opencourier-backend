import { PrismaService } from '../services/prisma/prisma.service'

export abstract class EntityRepository {
  protected constructor(protected readonly prisma: PrismaService) {}
}
