import * as errors from '../../../errors'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IPhoneTokenPayload } from '../interfaces/IPhoneTokenPayload'
import { IEmailTokenPayload } from '../interfaces/IEmailTokenPayload'
import { UserRepository } from '../../../persistence/repositories/user.repository'
import { JWT_REFRESH_SECRET_KEY } from 'src/constants'
import { IAuthStrategy } from '../interfaces/IAuthStrategy'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') implements IAuthStrategy {
  constructor(
    protected readonly userRepository: UserRepository,
    @Inject(JWT_REFRESH_SECRET_KEY) protected readonly secretOrKey: string
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      ignoreExpiration: false,
      secretOrKey,
    })
  }
  async validate(payload: IPhoneTokenPayload | IEmailTokenPayload) {
    const email = (payload as IEmailTokenPayload).email
    const user = await this.userRepository.findUserWithEmail(email)

    if (!user) {
      throw new errors.ForbiddenException('no user found')
    }

    if (!user.role.length) {
      throw new Error('User roles is not a valid value')
    }
    return user
  }
}
