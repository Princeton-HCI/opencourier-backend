import { User } from '@prisma/types'

export interface IUserRepository {
  findById(userId: string): Promise<User>
}
