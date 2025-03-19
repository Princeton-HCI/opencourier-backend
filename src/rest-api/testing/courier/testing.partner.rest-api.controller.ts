import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { COURIER_API_V1_PREFIX } from 'src/constants'
import { DeliveryMatchingService } from 'src/services/delivery-matching/delivery-matching.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('testing')
@common.Controller(`${COURIER_API_V1_PREFIX}/testing`)
export class TestingCourierRestApiController {
  constructor(private readonly deliveryMatchingService: DeliveryMatchingService) {}

  @common.Post('test/:deliveryId/assign-courier')
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Test endpoint: assigning courier for delivery' })
  @Roles(EnumUserRole.COURIER)
  async findCourier(@common.Param('deliveryId') deliveryId: string): Promise<any> {
    const courier = await this.deliveryMatchingService.matchDeliveryToCourier(deliveryId)
    if (!courier) {
      throw new errors.NotFoundException('No couriers are available.')
    }
    return courier;
  }
}
