import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { ADMIN_API_V1_PREFIX } from 'src/constants'
import { DeliveryMatchingService } from 'src/services/delivery-matching/delivery-matching.service'
import { TestDeliveryCreateAdminInput } from './dtos/test-delivery-create.admin.input'
import { TestingAdminRestApiService } from './testing.admin.rest-api.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('testing')
@common.Controller(`${ADMIN_API_V1_PREFIX}/testing`)
export class TestingAdminRestApiController {
  constructor(
    private readonly testAdminRestApiService: TestingAdminRestApiService,
    private readonly deliveryMatchingService: DeliveryMatchingService
  ) {}

  @common.Post('match-delivery-to-courier/:deliveryId')
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Test endpoint: assigning courier for delivery' })
  @Roles(EnumUserRole.ADMIN)
  async findCourier(@common.Param('deliveryId') deliveryId: string): Promise<any> {
    const courier = await this.deliveryMatchingService.matchDeliveryToCourier(deliveryId)

    if (!courier) {
      throw new errors.NotFoundException('No couriers are available.')
    }

    return courier
  }

  @common.Post('create-test-delivery')
  @swagger.ApiBody({
    type: TestDeliveryCreateAdminInput,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Test endpoint: create a test delivery' })
  @Roles(EnumUserRole.ADMIN)
  async createTestDelivery(@common.Body() data: TestDeliveryCreateAdminInput): Promise<any> {
    const delivery = await this.testAdminRestApiService.createTestQuoteAndDelivery(data);

    if (!delivery) {
      throw new errors.NotFoundException('No deliveries are available.')
    }

    return delivery
  }
}