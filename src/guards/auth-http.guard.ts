import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { JwtAuthGuard } from '../domains/auth/jwt/jwtAuth.guard'
import { IS_PRIVATE_WITH_REFRESH_TOKEN } from 'src/decorators/private-with-refresh-token.decorator'
import { IS_API_KEY_AUTH } from 'src/decorators/api-key-auth.decorator'

@Injectable()
export class AuthHttpGuard extends JwtAuthGuard {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isWithApiKey = this.reflector.get<boolean>(IS_API_KEY_AUTH, context.getHandler())
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler())
    const isPrivateWithRefreshToken = this.reflector.get<boolean>(IS_PRIVATE_WITH_REFRESH_TOKEN, context.getHandler())

    return isPublic || isPrivateWithRefreshToken || isWithApiKey || super.canActivate(context)
  }
}
