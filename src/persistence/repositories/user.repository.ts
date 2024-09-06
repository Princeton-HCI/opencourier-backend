import { Injectable } from '@nestjs/common'
import { User } from '@prisma/types'
import { assign } from 'lodash'
import { UserEntity } from '../../domains/user/entities/user.entity'
import { IUserRepository } from '../../domains/user/interfaces/IUserRepository'
import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { Exact } from 'src/types'
import { IUserUpdate } from 'src/domains/user/interfaces/IUserUpdate'
import { IUserCreate } from 'src/domains/user/interfaces/IUserCreate'

@Injectable()
export class UserRepository extends EntityRepository implements IUserRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async create(data: Exact<IUserCreate>) {
    const result = await this.prisma.user.create({
      data: {
        ...data,
      },
    })
    return this.toDomain(result)
  }

  async findById(userId: string) {
    const result = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    })
    return this.toDomain(result)
  }

  async findByApiKey(apiKey: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        apiKey: apiKey,
      },
    })
    return result ? this.toDomain(result) : null
  }

  async findByIdWithCourier(userId: string) {
    const result = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        courier: true,
      },
    })
    return assign(this.toDomain(result))
  }

  async findUserWithEmail(email: string) {
    const result = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    return result ? this.toDomain(result) : undefined
  }

  async findByEmail(email: string) {
    const result = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    })
    return this.toDomain(result)
  }

  findByCustomerPhone(number: string) {
    throw new Error('Not implemented')
  }

  findByGroupId(groupId: string) {
    throw new Error('Not implemented')
  }

  async updateById(userId: string, data: Exact<IUserUpdate>) {
    const result = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
      include: {
        courier: true,
      },
    })

    return assign(this.toDomain(result))
  }

  async deleteById(userId: string) {
    const result = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    })
    return this.toDomain(result)
  }

  private toDomain(data: User) {
    return new UserEntity(data)
  }

  private toDomainMany(data: User[]) {
    return data.map((d) => this.toDomain(d))
  }
}
