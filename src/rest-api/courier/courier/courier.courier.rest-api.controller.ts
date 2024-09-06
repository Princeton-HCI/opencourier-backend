import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { COURIER_API_V1_PREFIX } from '../../../constants'
import { CourierDomainService } from '../../../domains/courier/courier.domain.service'
import { CourierUpdateCurrentLocationCourierInput } from './queries/courier-update-current-location.courier.input'
import * as errors from 'src/errors'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { CurrentUserCourier } from 'src/decorators/currentUserCourier.decorator'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { CourierUpdateStatusCourierInput } from './queries/courier-update-status.courier.input'
import { CourierUpdateDeliverySettingCourierInput } from './queries/courier-update-delivery-setting.courier.input'

@swagger.ApiBearerAuth()
@swagger.ApiTags('courier')
@common.Controller(`${COURIER_API_V1_PREFIX}/courier`)
export class CourierCourierRestApiController {
  constructor(private readonly courierDomainService: CourierDomainService) {}

  @common.Patch('location')
  @swagger.ApiBody({
    type: CourierUpdateCurrentLocationCourierInput,
  })
  @swagger.ApiOkResponse({ status: 200 })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Update current courier location' })
  @Roles(EnumUserRole.COURIER)
  async updateCurrentLocation(
    @common.Body() data: CourierUpdateCurrentLocationCourierInput,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<void> {
    await this.courierDomainService.updateCurrentLocation(courier.id, {
      latitude: data.latitude,
      longitude: data.longitude,
    })
  }

  @common.Patch('status')
  @swagger.ApiBody({
    type: CourierUpdateStatusCourierInput,
  })
  @swagger.ApiOkResponse({ status: 200 })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Update status' })
  @Roles(EnumUserRole.COURIER)
  async updateStatus(
    @common.Body() data: CourierUpdateStatusCourierInput,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<void> {
    await this.courierDomainService.updateStatus(courier.id, data.status)
  }

  @common.Patch('delivery-setting')
  @swagger.ApiBody({
    type: CourierUpdateDeliverySettingCourierInput,
  })
  @swagger.ApiOkResponse({ status: 200 })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Update delivery setting' })
  @Roles(EnumUserRole.COURIER)
  async updateDeliverySetting(
    @common.Body() data: CourierUpdateDeliverySettingCourierInput,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<void> {
    await this.courierDomainService.updateDeliverySetting(courier.id, data.deliverySetting)
  }
}
