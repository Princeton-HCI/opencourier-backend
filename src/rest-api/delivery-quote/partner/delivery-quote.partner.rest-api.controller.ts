import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { PARTNER_API_V1_PREFIX } from 'src/constants'
import { DeliveryQuotePartnerDto } from './dtos/delivery-quote.partner.dto'
import { DeliverQuoteCreatePartnerInput } from './queries/delivery-quote-create.partner.input'
import { DeliveryQuotePartnerRestApiService } from './delivery-quote.partner.rest-api.service'
import { CurrentUserPartner } from 'src/decorators/currentUserPartner.decorator'
import { PartnerEntity } from 'src/domains/partner/entities/partner.entity'
import { ApiKeyAuth } from 'src/decorators/api-key-auth.decorator'

@swagger.ApiBearerAuth()
@swagger.ApiTags('delivery-quotes')
@common.Controller(`${PARTNER_API_V1_PREFIX}/delivery-quotes`)
export class DeliveryQuotePartnerRestApiController {
  constructor(private readonly deliveryQuoteRestApiPartnerService: DeliveryQuotePartnerRestApiService) {}

  @common.Get(':deliveryQuoteId')
  @swagger.ApiResponse({ type: DeliveryQuotePartnerDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Fetch delivery quote data by id' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async getDeliveryQuote(@common.Param('deliveryQuoteId') deliveryQuoteId: string): Promise<DeliveryQuotePartnerDto> {
    const deliveryQuote = await this.deliveryQuoteRestApiPartnerService.getByIdOrThrow(deliveryQuoteId)

    const dto = new DeliveryQuotePartnerDto(deliveryQuote)
    return dto
  }

  @common.Post('')
  @swagger.ApiBody({
    type: DeliverQuoteCreatePartnerInput,
  })
  @swagger.ApiOkResponse({
    type: DeliveryQuotePartnerDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Create delivery quote' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async createDeliveryQuote(
    @common.Body() data: DeliverQuoteCreatePartnerInput,
    @CurrentUserPartner() partner: PartnerEntity
  ): Promise<DeliveryQuotePartnerDto | null> {
    const deliveryQuote = await this.deliveryQuoteRestApiPartnerService.create(partner.id, data)

    return deliveryQuote ? new DeliveryQuotePartnerDto(deliveryQuote) : null
  }
}
