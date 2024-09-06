import * as common from '@nestjs/common'
import { Body, Get, Post } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import * as swagger from '@nestjs/swagger'
import { EnumUserRole } from '@prisma/types'
import { Public } from 'src/decorators/public.decorator'
import { PARTNER_API_V1_PREFIX, PUBLIC_DEFAULT_THROTTLE } from '../../../constants'
import { CurrentUser } from '../../../decorators/currentUser.decorator'
import { AuthDomainService } from '../../../domains/auth/auth.domain.service'
import { UserEntity } from '../../../domains/user/entities/user.entity'
import * as errors from '../../../errors'
import { UserInfoPartnerDto } from './dtos/user-info.partner.dto'
import { UserPartnerDto } from './dtos/user.partner.dto'
import { EmailLoginPartnerInput } from './queries/email-login.partner.input'

@swagger.ApiBearerAuth()
@swagger.ApiTags('auth')
@common.Controller(`${PARTNER_API_V1_PREFIX}/auth`)
export class AuthPartnerRestApiController {
  constructor(private readonly authDomainService: AuthDomainService) {}

  @Public()
  @Post('login')
  @swagger.ApiBody({ type: EmailLoginPartnerInput })
  @swagger.ApiOkResponse({ type: UserInfoPartnerDto })
  @swagger.ApiOperation({ summary: 'Login as partner' })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @Throttle(PUBLIC_DEFAULT_THROTTLE)
  async login(@Body() body: EmailLoginPartnerInput): Promise<UserInfoPartnerDto> {
    const result = await this.authDomainService.loginWithEmail(body)
    if (!result.user.role.includes(EnumUserRole.PARTNER)) {
      throw new errors.ForbiddenException('You are not allowed to login as partner')
    }
    return new UserInfoPartnerDto(result)
  }

  @Get('me')
  @swagger.ApiOkResponse({ type: UserPartnerDto })
  @swagger.ApiOperation({ summary: 'Return current user data' })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async getMe(@CurrentUser() user: UserEntity): Promise<UserPartnerDto> {
    const me = await this.authDomainService.getMe(user.id)
    return new UserPartnerDto(me)
  }
}
