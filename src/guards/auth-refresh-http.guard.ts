import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PRIVATE_WITH_REFRESH_TOKEN } from 'src/decorators/private-with-refresh-token.decorator'
import { JwtRefreshAuthGuard } from 'src/domains/auth/jwt/jwtRefreshAuth.guard'

@Injectable()
export class AuthRefreshHttpGuard extends JwtRefreshAuthGuard {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPrivateWithRefreshToken = this.reflector.get<boolean>(IS_PRIVATE_WITH_REFRESH_TOKEN, context.getHandler())

    if (isPrivateWithRefreshToken) {
      return super.canActivate(context)
    }

    return true;
  }
}
