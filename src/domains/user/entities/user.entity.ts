import { EnumUserRole, User } from '@prisma/types'

export class UserEntity implements User {
  id: string
  email: string | null
  password: string | null
  role: EnumUserRole[]
  createdAt: Date
  updatedAt: Date

  username: string | null
  apiKey: string | null

  constructor(data: User) {
    this.id = data.id
    this.email = data.email
    this.password = data.password
    this.role = data.role

    this.username = data.username
    this.apiKey = data.apiKey

    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
