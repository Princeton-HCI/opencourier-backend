import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'

@Injectable()
export class HealthService {
  constructor(protected readonly prisma: PrismaService) {}

  async isDbReady(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      return false
    }
  }
}
