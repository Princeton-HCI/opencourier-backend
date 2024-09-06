import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response, NextFunction } from 'express'
import { AuthDomainService } from '../domains/auth/auth.domain.service'
import { AuthedRequest } from '../core/models/AuthedRequest'
import { isRecordNotFoundError } from '../prisma.util'
import { JsonWebTokenError } from '@nestjs/jwt'
import { JwtExpiredException, UnauthorizedException } from '../errors'
import { TokenExpiredError } from 'jsonwebtoken'
import { CourierDomainService } from 'src/domains/courier/courier.domain.service'
import { EnumUserRole } from '@prisma/types'
import { PartnerDomainService } from 'src/domains/partner/partner.domain.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthDomainService,
    private readonly courierDomainService: CourierDomainService,
    private readonly partnerDomainService: PartnerDomainService
  ) {}

  async use(req: AuthedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization ?? ''
    const refreshToken = req.headers['x-refresh-token']?.toString() ?? ''
    const apiKey = req.headers['x-api-key']?.toString() ?? req.query.api_key?.toString() ?? ''

    if (!authHeader.startsWith('Bearer ') && !refreshToken && !apiKey) {
      return next()
    }

    try {
      let user
      if (refreshToken) {
        user = await this.findUserForRefreshToken(refreshToken)
      } else if (apiKey) {
        user = await this.findUserForApiKey(apiKey)
      } else {
        user = await this.findUserForAuthorizationHeader(authHeader)
      }

      req.currentUser = user

      if (user.role.includes(EnumUserRole.COURIER)) {
        const courier = await this.courierDomainService.getByUserId(user.id)
        req.currentCourier = courier
      }

      if (user.role.includes(EnumUserRole.PARTNER)) {
        const partner = await this.partnerDomainService.getByUserId(user.id)
        req.currentPartner = partner
      }
    } catch (error) {
      console.log(error)
      if (error instanceof TokenExpiredError) {
        next(new JwtExpiredException('Unauthorized'))
        return
      } else if (error instanceof JsonWebTokenError || (error instanceof Error && isRecordNotFoundError(error))) {
        next(new UnauthorizedException('Unauthorized'))
        return
      } else {
        next(error)
        return
      }
    }

    next()
  }

  async findUserForAuthorizationHeader(authorizationHeader: string) {
    return this.authService.userForAuthorizationHeader(authorizationHeader)
  }

  async findUserForRefreshToken(refreshToken: string) {
    return this.authService.userForRefreshToken(refreshToken)
  }

  async findUserForApiKey(apiKey: string) {
    return this.authService.userForApiKey(apiKey)
  }
}
