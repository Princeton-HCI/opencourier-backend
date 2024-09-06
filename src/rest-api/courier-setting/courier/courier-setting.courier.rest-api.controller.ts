import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { COURIER_API_V1_PREFIX } from '../../../constants'
import * as errors from '../../../errors'
import { Roles } from 'src/decorators/roles.decorator'
import { EnumUserRole } from '@prisma/types'
import { CourierSettingUpdateCourierInput } from './queries/courier-setting-update.courier.input'
import { CourierFullSettingsCourierDto } from './dtos/courier-full-settings.courier.dto'
import { CourierSettingDomainService } from 'src/domains/courier-setting/courier-setting.domain.service'
import { CurrentUserCourier } from 'src/decorators/currentUserCourier.decorator'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'

@swagger.ApiBearerAuth()
@swagger.ApiTags('courier settings')
@common.Controller(`${COURIER_API_V1_PREFIX}/courier-settings`)
export class CourierSettingCourierRestApiController {
  constructor(private readonly courierSettingDomainService: CourierSettingDomainService) {}

  @common.Get('')
  @swagger.ApiOkResponse({
    type: CourierFullSettingsCourierDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Get current courier full settings' })
  @Roles(EnumUserRole.COURIER)
  async getMySettings(@CurrentUserCourier() courier: CourierEntity): Promise<CourierFullSettingsCourierDto> {
    const courierFullSettings = await this.courierSettingDomainService.getByCourierId(courier.id)

    const dto = new CourierFullSettingsCourierDto(courierFullSettings)
    return dto
  }

  @common.Patch('')
  @swagger.ApiBody({
    type: CourierSettingUpdateCourierInput,
  })
  @swagger.ApiOkResponse({
    type: CourierFullSettingsCourierDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Update current courier full settings' })
  @Roles(EnumUserRole.COURIER)
  async updateMySettings(
    @CurrentUserCourier() courier: CourierEntity,
    @common.Body() data: CourierSettingUpdateCourierInput
  ): Promise<CourierFullSettingsCourierDto> {
    const courierSetting = await this.courierSettingDomainService.updateOrCreateByCourierId(courier.id, data)

    const dto = new CourierFullSettingsCourierDto(courierSetting)
    return dto
  }
}
