import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { COURIER_API_V1_PREFIX } from '../../../constants'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { PayoutCreateCourierInput } from './queries/payout-create.courier.input'
import { Public } from 'src/decorators/public.decorator'
import { PayoutRestApiCourierService } from './payout.courier.rest-api.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('payouts')
@common.Controller(`${COURIER_API_V1_PREFIX}/payouts`)
export class PayoutCourierRestApiController {
  constructor(private readonly payoutRestApiCourierService: PayoutRestApiCourierService) {}

  @common.Post('')
  @swagger.ApiBody({
    type: PayoutCreateCourierInput,
  })
  // @swagger.ApiCreatedResponse({
  //   type: PayoutCourierDto,
  // })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Receive earnings via payment provider' })
  @Roles(EnumUserRole.COURIER)
  async createCatalog(@common.Body() data: PayoutCreateCourierInput): Promise<void> {
    throw await new common.NotImplementedException()
  }

  @common.Get('connect/initiate')
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Redirect user to Payment provider' })
  @Roles(EnumUserRole.COURIER)
  async stripeConnectFlow(): Promise<void> {
    throw await new common.NotImplementedException()
  }

  @common.Get('connect/callback')
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Handle callback from payment provider' })
  @Public()
  async handleStripeConnectCallback(): Promise<void> {
    throw await new common.NotImplementedException()
  }
}
