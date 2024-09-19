import { Injectable, Logger } from '@nestjs/common'
import { EnumUserRole } from '@prisma/types'
import { assign } from 'lodash'
import { AblyService } from 'src/integrations/ably/ably.service'
import * as errors from '../../errors'
import { isRecordNotFoundError } from '../../prisma.util'
import { CourierDomainService } from '../courier/courier.domain.service'
import { UserEntity } from '../user/entities/user.entity'
import { IUserUpdate } from '../user/interfaces/IUserUpdate'
import { UserDomainService } from '../user/user.domain.service'
import { ICourierRegister } from './interfaces/ICourierRegister'
import { IEmailLogin } from './interfaces/IEmailLogin'
import { PasswordService } from './password.service'
import { TokenService } from './token.service'

@Injectable()
export class AuthDomainService {
  private readonly logger = new Logger(AuthDomainService.name)

  constructor(
    private userDomainService: UserDomainService,
    private courierDomainService: CourierDomainService,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private ablyService: AblyService
  ) {}

  async verifyUniqueEmailInput(email: string) {
    const result = await this.userDomainService.findUserWithEmail(email)

    if (result) {
      throw new errors.UserExistsException('A user with this email already exists')
    }

    return { body: 'valid' }
  }

  async registerCourier(input: ICourierRegister) {
    const { email, password, firstName, lastName } = input

    const userExists = await this.userDomainService.findUserWithEmail(email)

    if (userExists) {
      throw new errors.UserExistsException('A user with this email already exists')
    }

    const hashedPasword = await this.passwordService.hash(password)
    const user = await this.userDomainService.create({
      email: email,
      password: hashedPasword,
      role: [EnumUserRole.COURIER],
    })

    await this.courierDomainService.create({
      userId: user.id,
      firstName: firstName,
      lastName: lastName,
    })

    const session = await this.tokenService.createEmailAuthSession({
      sub: user.id,
      email: email,
      role: user.role,
    })

    return assign({
      session,
      user,
    })
  }

  async loginWithEmail(input: IEmailLogin) {
    const { email, password } = input

    const user = await this.validateUser(password, email)

    if (!user) {
      throw new errors.ForbiddenException('These credentials are incorrect')
    }

    const session = await this.tokenService.createEmailAuthSession({
      sub: user.id,
      email: email,
      role: user.role,
    })

    return assign({
      session,
      user,
    })
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const payload = this.tokenService.decodeRefreshToken(refreshToken)

    if (payload.sub !== userId) {
      throw new errors.ForbiddenException('Invalid refresh token')
    }

    const user = await this.userDomainService.findById(userId)

    const session = await this.tokenService.createEmailAuthSession({
      sub: user.id,
      email: user.email || '',
      role: user.role,
    })

    return assign({
      session,
      user,
    })
  }

  async getMe(userId: string) {
    try {
      return this.userDomainService.findById(userId)
    } catch (error) {
      if (error instanceof Error && isRecordNotFoundError(error)) {
        throw new errors.ForbiddenException(`User with ID ${userId} does not exist`)
      }
      throw error
    }
  }

  async getMeWithCourier(userId: string) {
    const user = await this.getMe(userId)
    const courier = await this.courierDomainService.getByUserId(user.id)

    return {
      user,
      courier,
    }
  }

  async updateMe(user: UserEntity, data: IUserUpdate) {
    return this.userDomainService.updateMe(user, data)
  }

  async deleteMe(user: UserEntity) {
    return this.userDomainService.deleteMe(user)
  }

  async userForAuthorizationHeader(authorization = '') {
    try {
      const bearer = authorization.replace(/^Bearer\s/, '')
      const payload = this.tokenService.decodeToken(bearer)

      const user = await this.userDomainService.findById(payload.sub)

      return user
    } catch (error) {
      if (error instanceof Error && isRecordNotFoundError(error)) {
        throw new errors.ForbiddenException('User not found from authorization header')
      }
      throw error
    }
  }

  async userForRefreshToken(authorization = '') {
    try {
      const bearer = authorization.replace(/^Bearer\s/, '')
      const payload = this.tokenService.decodeRefreshToken(bearer)

      const user = await this.userDomainService.findById(payload.sub)

      return user
    } catch (error) {
      if (error instanceof Error && isRecordNotFoundError(error)) {
        throw new errors.ForbiddenException('User not found from refresh token')
      }
      throw error
    }
  }

  async userForApiKey(apiKey = '') {
    const user = await this.userDomainService.findByApiKey(apiKey)

    if (!user) {
      throw new errors.ForbiddenException('User not found from apiKey')
    }

    return user
  }

  async getAblyToken(user: UserEntity) {
    return this.ablyService.createToken(user)
  }

  private async validateUser(password: string, email: string) {
    try {
      const user = await this.userDomainService.findByEmail(email)

      if (user.password && (await this.passwordService.compare(password, user.password))) {
        return user
      }
    } catch (error) {
      if (error instanceof Error && isRecordNotFoundError(error)) {
        return null
      }
      throw error
    }
  }
}
