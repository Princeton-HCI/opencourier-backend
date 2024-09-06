import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { PARTNER_API_V1_PREFIX } from 'src/constants'
import { DeliveryCreatePartnerInput } from './queries/delivery-create.partner.input'
import { DeliveryPartnerRestApiService } from './delivery.partner.rest-api.service'
import { CurrentUserPartner } from 'src/decorators/currentUserPartner.decorator'
import { PartnerEntity } from 'src/domains/partner/entities/partner.entity'
import { DeliveryPartnerDto } from './dtos/delivery.partner.dto'
import { DeliveryFindManyPartnerArgs } from './queries/delivery-find-many.partner.args'
import { DeliveryPartnerPaginatedDto } from './dtos/delivery.partner.paginated.dto'
import { DeliveryUpdatePartnerInput } from './queries/delivery-update.partner.input'
import { DeliveryMatchingService } from 'src/services/delivery-matching/delivery-matching.service'
import { ApiKeyAuth } from 'src/decorators/api-key-auth.decorator'

@swagger.ApiBearerAuth()
@swagger.ApiTags('deliveries')
@common.Controller(`${PARTNER_API_V1_PREFIX}/deliveries`)
export class DeliveryPartnerRestApiController {
  constructor(
    private readonly deliveryPartnerRestApiService: DeliveryPartnerRestApiService,
    private readonly testDeliveryMatchingService: DeliveryMatchingService
  ) {}

  @common.Get('')
  @swagger.ApiBody({ type: DeliveryFindManyPartnerArgs })
  @swagger.ApiResponse({ type: DeliveryPartnerPaginatedDto })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'List deliveries' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async listDeliveries(
    @common.Query() args: DeliveryFindManyPartnerArgs,
    @CurrentUserPartner() partner: PartnerEntity
  ): Promise<DeliveryPartnerPaginatedDto> {
    const result = await this.deliveryPartnerRestApiService.getManyByPartnerId(partner.id, args.page, args.perPage)

    const dto = new DeliveryPartnerPaginatedDto(result)

    return dto
  }

  @common.Get(':deliveryId')
  @swagger.ApiOkResponse({
    type: DeliveryPartnerDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Get a delivery by id' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async getDelivery(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserPartner() partner: PartnerEntity
  ): Promise<DeliveryPartnerDto> {
    const result = await this.deliveryPartnerRestApiService.getByIdWithRelations(deliveryId, partner.id)

    const dto = new DeliveryPartnerDto(result.delivery, {
      courierWithSettings: result.courierWithSettings,
      pickupLocation: result.pickupLocation,
      dropoffLocation: result.dropoffLocation,
    })

    return dto
  }

  @common.Post('')
  @swagger.ApiBody({
    type: DeliveryCreatePartnerInput,
  })
  @swagger.ApiOkResponse({
    type: DeliveryPartnerDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Create delivery' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async createDelivery(
    @common.Body() data: DeliveryCreatePartnerInput,
    @CurrentUserPartner() partner: PartnerEntity
  ): Promise<DeliveryPartnerDto> {
    const delivery = await this.deliveryPartnerRestApiService.create(partner.id, data)

    const dto = new DeliveryPartnerDto(delivery)
    return dto
  }

  @common.Post(':deliveryId')
  @swagger.ApiBody({
    type: DeliveryUpdatePartnerInput,
  })
  @swagger.ApiOkResponse({
    type: DeliveryPartnerDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Create delivery' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async updateDelivery(
    @common.Param('deliveryId') deliveryId: string,
    @common.Body() data: DeliveryUpdatePartnerInput,
    @CurrentUserPartner() partner: PartnerEntity
  ): Promise<DeliveryPartnerDto> {
    const delivery = await this.deliveryPartnerRestApiService.update(deliveryId, partner.id, data)

    const dto = new DeliveryPartnerDto(delivery)
    return dto
  }

  @common.Post(':deliveryId/cancel')
  @swagger.ApiOkResponse({
    type: DeliveryPartnerDto,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiOperation({ summary: 'Cancel a delivery' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async cancelDelivery(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserPartner() partner: PartnerEntity
  ): Promise<DeliveryPartnerDto> {
    const result = await this.deliveryPartnerRestApiService.cancel(deliveryId, partner.id)

    const dto = new DeliveryPartnerDto(result)

    return dto
  }

  @common.Post('test/:deliveryId/assign-courier')
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Test endpoint: assigning courier for delivery' })
  @ApiKeyAuth()
  @Roles(EnumUserRole.PARTNER)
  async findCourier(@common.Param('deliveryId') deliveryId: string): Promise<any> {
    const courier = await this.testDeliveryMatchingService.matchDeliveryToCourier(deliveryId)

    if (!courier) {
      throw new errors.NotFoundException('No couriers are available.')
    }

    return courier
  }
}
