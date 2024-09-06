import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { IEmailTokenPayload } from './interfaces/IEmailTokenPayload'
import { IPhoneTokenPayload } from './interfaces/IPhoneTokenPayload'
import { UserSessionEntity } from './entities/user-session.entity'
import { ConfigService } from '@nestjs/config'
import { JWT_REFRESH_EXPIRATION, JWT_REFRESH_SECRET_KEY } from 'src/constants'

@Injectable()
export class TokenService {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService
  ) {}

  async createPhoneAuthSession(payload: IPhoneTokenPayload) {
    if (!payload.cellPhone) {
      throw new UnauthorizedException('Cellphone value is missing')
    }

    const accessToken = await this.jwtService.signAsync(payload)
    const expiresIn = parseInt(process.env.JWT_EXPIRATION || '') || 0

    const refreshExpiresIn = parseInt(this.configService.get(JWT_REFRESH_EXPIRATION) || '') || 0
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(JWT_REFRESH_SECRET_KEY) || '',
      expiresIn: refreshExpiresIn
    })

    return new UserSessionEntity(accessToken, refreshToken, 'Bearer', expiresIn, refreshExpiresIn)
  }

  async createEmailAuthSession(payload: IEmailTokenPayload) {
    if (!payload.email) {
      throw new UnauthorizedException('Email value is missing')
    }

    const accessToken = await this.jwtService.signAsync(payload)
    const expiresIn = parseInt(process.env.JWT_EXPIRATION || '') || 0

    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const refreshExpiresIn = parseInt(process.env.JWT_REFRESH_EXPIRATION || '') || 0
    const refreshToken = await this.jwtService.signAsync(payload, {
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      secret: process.env.JWT_REFRESH_SECRET_KEY || '',
      expiresIn: refreshExpiresIn
    })
    
    return new UserSessionEntity(accessToken, refreshToken, 'Bearer', expiresIn, refreshExpiresIn)
  }

  /**
   * @param bearer
   * @returns the email and cellPhone from a jwt token
   */
  decodeToken(bearer: string): IEmailTokenPayload | IPhoneTokenPayload {
    return this.jwtService.verify(bearer, { secret: process.env.JWT_SECRET_KEY || '' })
  }
  
  decodeRefreshToken(bearer: string): IEmailTokenPayload | IPhoneTokenPayload {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    return this.jwtService.verify(bearer, { secret: process.env.JWT_REFRESH_SECRET_KEY || '' })
  }
}
