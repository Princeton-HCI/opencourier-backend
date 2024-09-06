import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { JwtAuthGuard } from '../domains/auth/jwt/jwtAuth.guard'
import { IS_PRIVATE_WITH_REFRESH_TOKEN } from 'src/decorators/private-with-refresh-token.decorator'

@Injectable()
export class AuthHttpGuard extends JwtAuthGuard {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler())
    const isPrivateWithRefreshToken = this.reflector.get<boolean>(IS_PRIVATE_WITH_REFRESH_TOKEN, context.getHandler())

    return isPublic || isPrivateWithRefreshToken || super.canActivate(context)
  }
}
