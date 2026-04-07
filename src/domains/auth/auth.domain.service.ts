import { Injectable, Logger } from '@nestjs/common'
import { EnumUserRole } from '@prisma/types'
import { assign } from 'lodash'
import { AblyService } from 'src/integrations/ably/ably.service'
import * as errors from '../../errors'
import { isRecordNotFoundError } from '../../prisma.util'
import { CourierDomainService } from '../courier/courier.domain.service'
import { PartnerDomainService } from '../partner/partner.domain.service'
import { UserEntity } from '../user/entities/user.entity'
import { IUserUpdate } from '../user/interfaces/IUserUpdate'
import { UserDomainService } from '../user/user.domain.service'
import { ICourierRegister } from './interfaces/ICourierRegister'
import { IEmailLogin } from './interfaces/IEmailLogin'
import { PasswordService } from './password.service'
import { TokenService } from './token.service'
import { randomBytes } from 'crypto'

@Injectable()
export class AuthDomainService {
  private readonly logger = new Logger(AuthDomainService.name)

  constructor(
    private userDomainService: UserDomainService,
    private courierDomainService: CourierDomainService,
    private partnerDomainService: PartnerDomainService,
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

  async loginPartnerWithUsername(input: { email: string; password: string }) {
    const { email, password } = input
    const user = await this.validateUser(password, email)

    if (!user) {
      throw new errors.ForbiddenException('These credentials are incorrect')
    }

    if (!user.role.includes(EnumUserRole.PARTNER)) {
      throw new errors.ForbiddenException('You are not allowed to login as partner')
    }

    const apiKey = await this.ensurePartnerApiKey(user)

    const session = await this.tokenService.createEmailAuthSession({
      sub: user.id,
      email: user.email || '',
      role: user.role,
    })

    return assign({
      session,
      user: assign(user, { apiKey }),
    })
  }

  async registerPartner(input: { email: string; password: string; partnerName?: string }) {
    const email = input.email.trim().toLowerCase()

    const userExists = await this.userDomainService.findUserWithEmail(email)

    if (userExists) {
      throw new errors.UserExistsException('A partner with this email already exists')
    }

    const hashedPassword = await this.passwordService.hash(input.password)
    const apiKey = this.generateApiKey()

    const user = await this.userDomainService.create({
      email,
      password: hashedPassword,
      role: [EnumUserRole.PARTNER],
      apiKey,
    })

    await this.partnerDomainService.create({
      name: input.partnerName?.trim() || email,
      userId: user.id,
    })

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

  private async validateUserByUsername(password: string, username: string) {
    try {
      const user = await this.userDomainService.findByUsername(username)

      if (user.password && (await this.passwordService.compare(password, user.password))) {
        return user
      }
    } catch {
      return null
    }

    return null
  }

  private async ensurePartnerApiKey(user: UserEntity) {
    if (user.apiKey) return user.apiKey

    const apiKey = this.generateApiKey()
    const updatedUser = await this.userDomainService.updateMe(user, { apiKey })
    return updatedUser.apiKey || apiKey
  }

  private generateApiKey() {
    return randomBytes(96).toString('hex')
  }
}
