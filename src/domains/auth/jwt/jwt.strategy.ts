import * as errors from '../../../errors'
import { Inject, Injectable } from '@nestjs/common'
import { JWT_SECRET_KEY } from '../../../constants'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IAuthStrategy } from '../interfaces/IAuthStrategy'
import { IPhoneTokenPayload } from '../interfaces/IPhoneTokenPayload'
import { IEmailTokenPayload } from '../interfaces/IEmailTokenPayload'
import { UserRepository } from '../../../persistence/repositories/user.repository'
import { UserEntity } from '../../user/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements IAuthStrategy {
  constructor(
    protected readonly userRepository: UserRepository,
    @Inject(JWT_SECRET_KEY) protected readonly secretOrKey: string
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    })
  }

  async validate(payload: IPhoneTokenPayload | IEmailTokenPayload): Promise<UserEntity> {
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
