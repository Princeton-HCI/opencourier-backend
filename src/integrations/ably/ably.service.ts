import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common'
import { EnumUserRole } from '@prisma/types'
import { type Types } from 'ably'
import { UserEntity } from '../../domains/user/entities/user.entity'

@Injectable()
export class AblyService implements OnApplicationShutdown {
  @Inject('ablyClient')
  private ablyRealtime: Types.RealtimePromise

  onApplicationShutdown() {
    this.ablyRealtime.close()
  }

  getChannel(channelId: string) {
    return this.ablyRealtime.channels.get(channelId)
  }

  async createToken(userEntity: UserEntity) {
    const roles: Record<EnumUserRole, (user: UserEntity) => [string, Types.CapabilityOp[]][]> = {
      [EnumUserRole.ADMIN]: () => {
        return [[`ADMIN.*`, ['subscribe']]]
      },
      [EnumUserRole.COURIER]: (user: UserEntity) => {
        return [[`COURIER:${user.id}`, ['subscribe']]]
      },
      [EnumUserRole.PARTNER]: (user: UserEntity) => {
        return [[`PARTNER:${user.id}`, ['subscribe']]]
      },
    }

    const capability: { [name: string]: Types.capabilityOp[] } = {}

    userEntity.role.forEach((role) => {
      const capabilities = roles[role](userEntity)
      capabilities.forEach(([channelName, caps]) => {
        capability[channelName] = caps
      })
    })

    return this.ablyRealtime.auth.createTokenRequest({
      capability,
    })
  }
}
