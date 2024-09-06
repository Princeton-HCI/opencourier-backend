import { Injectable } from '@nestjs/common'
import { EntityRepository } from '../EntityRepository'
import { IConfigRepository } from '../../domains/config/interfaces/IConfigRepository'
import { ConfigEntity } from '../../domains/config/entities/config.entity'
import { Config } from '@prisma/types'
import { assign } from 'lodash'
import { PrismaService } from '../../services/prisma/prisma.service'
import { ConfigKey } from 'src/shared-types/index'

@Injectable()
export class ConfigRepository extends EntityRepository implements IConfigRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async getByKey(key: ConfigKey) {
    const result = await this.prisma.config.findUniqueOrThrow({
      where: {
        key,
      },
    })
    return assign(this.toDomain(result))
  }

  async saveByKey(key: ConfigKey, value: string | number | boolean | string[]) {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)

    const result = await this.prisma.config.upsert({
      where: {
        key,
      },
      create: {
        key,
        value: stringValue,
        type: typeof value,
      },
      update: {
        value: stringValue,
        type: typeof value,
      },
    })
    return this.toDomain(result)
  }

  private toDomain(data: Config) {
    return new ConfigEntity(data)
  }

  private toDomainMany(data: Config[]) {
    return data.map((d) => this.toDomain(d))
  }
}
