import { EnumUserRole } from '@prisma/types'

export interface IUserCreate {
  email: string
  password?: string
  role: EnumUserRole[]
}
