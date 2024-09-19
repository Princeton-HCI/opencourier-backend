import * as common from '@nestjs/common'
import { Body, Get, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import * as swagger from '@nestjs/swagger'
import { EnumUserRole } from '@prisma/types'
import { Public } from 'src/decorators/public.decorator'
import { COURIER_API_V1_PREFIX, PUBLIC_DEFAULT_THROTTLE } from '../../../constants'
import { CurrentUser } from '../../../decorators/currentUser.decorator'
import { AuthDomainService } from '../../../domains/auth/auth.domain.service'
import { UserEntity } from '../../../domains/user/entities/user.entity'
import * as errors from '../../../errors'
import { UserInfoCourierDto } from './dtos/user-info.courier.dto'
import { EmailLoginCourierInput } from './queries/email-login.courier.input'
import { AuthRegisterCourierInput } from './queries/auth-register.courier.input'
import { PrivateWithRefreshToken } from 'src/decorators/private-with-refresh-token.decorator'
import { Roles } from 'src/decorators/roles.decorator'
import { Request } from 'express'
import { UserWithCourierCourierDto } from './dtos/user-with-courier.courier.dto'
import { AblyTokenDto } from 'src/rest-api/common/dtos/ably-token.dto'

@swagger.ApiBearerAuth()
@swagger.ApiTags('auth')
@common.Controller(`${COURIER_API_V1_PREFIX}/auth`)
export class AuthCourierRestApiController {
  constructor(private readonly authDomainService: AuthDomainService) {}

  @Public()
  @Post('login')
  @swagger.ApiBody({ type: EmailLoginCourierInput })
  @swagger.ApiOkResponse({ type: UserInfoCourierDto })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @Throttle(PUBLIC_DEFAULT_THROTTLE)
  async login(@Body() body: EmailLoginCourierInput): Promise<UserInfoCourierDto> {
    const result = await this.authDomainService.loginWithEmail(body)
    if (!result.user.role.includes(EnumUserRole.COURIER)) {
      throw new errors.ForbiddenException('You are not allowed to login as courier')
    }
    return new UserInfoCourierDto(result)
  }

  @Post('refresh-tokens')
  @PrivateWithRefreshToken()
  @swagger.ApiBody({ type: EmailLoginCourierInput })
  @swagger.ApiOkResponse({ type: UserInfoCourierDto })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @Roles(EnumUserRole.COURIER)
  async refreshTokens(@CurrentUser() user: UserEntity, @common.Req() req: Request) {
    return await this.authDomainService.refreshTokens(user.id, req.headers['x-refresh-token']?.toString() || '')
  }

  @Public()
  @Post('register')
  @swagger.ApiBody({ type: AuthRegisterCourierInput })
  @swagger.ApiOkResponse({ type: UserInfoCourierDto })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @Throttle(PUBLIC_DEFAULT_THROTTLE)
  async register(@Body() body: AuthRegisterCourierInput): Promise<UserInfoCourierDto> {
    const result = await this.authDomainService.registerCourier(body)
    return new UserInfoCourierDto(result)
  }

  @Get('me')
  @swagger.ApiOkResponse({ type: UserWithCourierCourierDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async getMe(@CurrentUser() user: UserEntity): Promise<UserWithCourierCourierDto> {
    const data = await this.authDomainService.getMeWithCourier(user.id)
    return new UserWithCourierCourierDto(data.user, data.courier)
  }

  @common.Get('ably-token')
  @swagger.ApiOkResponse({ type: AblyTokenDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async getAblyToken(@CurrentUser() user: UserEntity): Promise<AblyTokenDto> {
    const tokenRequest = await this.authDomainService.getAblyToken(user)
    return new AblyTokenDto(tokenRequest)
  }
}
