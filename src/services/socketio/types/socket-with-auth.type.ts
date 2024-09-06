import { EnumUserRole } from '@prisma/types'
import { Socket } from 'socket.io'
import { UserEntity } from 'src/domains/user/entities/user.entity'

export type AuthPayload = {
  userId: string
  email: string
  role: EnumUserRole[]
  user: UserEntity
  channelNames: string[]
}

export type SocketWithAuth = Socket & AuthPayload
