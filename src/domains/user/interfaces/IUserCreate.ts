import { EnumUserRole } from '@prisma/types'

export interface IUserCreate {
  email?: string | null
  password?: string
  username?: string | null
  apiKey?: string | null
  role: EnumUserRole[]
}
