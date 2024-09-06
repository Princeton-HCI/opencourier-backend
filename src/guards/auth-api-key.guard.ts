import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_API_KEY_AUTH } from 'src/decorators/api-key-auth.decorator'
import { UserRepository } from 'src/persistence/repositories/user.repository'

@Injectable()
export class AuthApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext) {
    const isApiKey = this.reflector.get<boolean>(IS_API_KEY_AUTH, context.getHandler())

    if (!isApiKey) {
      return true
    }

    const req = context.switchToHttp().getRequest()
    const key = req.headers['x-api-key'] ?? req.query.api_key

    if (!key) {
      return false
    }

    const user = await this.userRepository.findByApiKey(key)

    if (!user) {
      return false
    }

    return true
  }
}
