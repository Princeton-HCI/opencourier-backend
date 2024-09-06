import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server, ServerOptions } from 'socket.io'
import { INestApplicationContext, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ForbiddenException } from 'src/errors'
import { SOCKET_GATEWAY_NAMESPACE } from './socketio.gateway'
import { UserRepository } from 'src/persistence/repositories/user.repository'
import { EnumUserRole } from '@prisma/types'
import { ExtendedError } from 'socket.io/dist/namespace'

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name)

  constructor(private readonly app: INestApplicationContext, private readonly configService: ConfigService) {
    super(app)
  }

  createIOServer(port: number, options: ServerOptions) {
    const cors = {
      origin: ['*'],
    }

    this.logger.log(`SocketIOAdapter: createIOServer with custom options: ${JSON.stringify(options)}`)

    const optionsWithCors = {
      ...options,
      cors,
    }

    const jwtService = this.app.get(JwtService)
    const userRepository = this.app.get(UserRepository)

    const server: Server = super.createIOServer(port, optionsWithCors)

    server.of(SOCKET_GATEWAY_NAMESPACE).use(createTokenMiddleware(jwtService, userRepository, this.logger))

    return server
  }
}

const createTokenMiddleware =
  (jwtService: JwtService, userRepository: UserRepository, logger: Logger) =>
  async (socket: any, next: (err?: ExtendedError | undefined) => void) => {
    const authHeader = socket.handshake.auth.authorization || socket.handshake.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ForbiddenException('Invalid token'))
    }

    const token = authHeader.replace(/^Bearer\s/, '')

    logger.debug(`Validating auth token before connection: ${token}`)

    try {
      const payload = jwtService.verify(token)

      const user = await userRepository.findUserWithEmail(payload.email)
      socket.user = user
      if (!user) {
        return next(new ForbiddenException('User not found'))
      }

      socket.userId = payload.sub
      socket.role = payload.role
      socket.email = payload.email

      const roles = payload.role as EnumUserRole[]
      socket.channelNames = roles.map((role) => createChannelNameFromUserIdAndRole(payload.sub, role))
      next()
    } catch (error) {
      next(new ForbiddenException('Invalid token'))
    }
  }

const createChannelNameFromUserIdAndRole = (userId: string, role: string) => {
  return `${role}:${userId}`
}
