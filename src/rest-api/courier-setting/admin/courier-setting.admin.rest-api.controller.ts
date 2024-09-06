import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { ADMIN_API_V1_PREFIX } from '../../../constants'
import * as errors from '../../../errors'
import { Roles } from 'src/decorators/roles.decorator'
import { EnumUserRole } from '@prisma/types'
import { CourierSettingUpdateAdminInput } from './queries/courier-setting-update.admin.input'
import { CourierFullSettingsAdminDto } from './dtos/courier-full-settings.admin.dto'
import { CourierSettingDomainService } from 'src/domains/courier-setting/courier-setting.domain.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('courier settings')
@common.Controller(`${ADMIN_API_V1_PREFIX}/courier-settings`)
export class CourierSettingAdminRestApiController {
  constructor(private readonly courierSettingDomainService: CourierSettingDomainService) {}

  @common.Get(':courierId')
  @swagger.ApiOkResponse({
    type: CourierFullSettingsAdminDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: "Get a courier's full settings" })
  @Roles(EnumUserRole.ADMIN)
  async getCourierFullSettings(@common.Param('courierId') courierId: string): Promise<CourierFullSettingsAdminDto> {
    const courierFullSettings = await this.courierSettingDomainService.getByCourierIdOrThrow(courierId)

    const dto = new CourierFullSettingsAdminDto(courierFullSettings)
    return dto
  }

  @common.Patch(':courierId')
  @swagger.ApiBody({
    type: CourierSettingUpdateAdminInput,
  })
  @swagger.ApiOkResponse({
    type: CourierFullSettingsAdminDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: "Update a courier's full settings" })
  @Roles(EnumUserRole.ADMIN)
  async updateCourierFullSettings(
    @common.Param('courierId') courierId: string,
    @common.Body() data: CourierSettingUpdateAdminInput
  ): Promise<CourierFullSettingsAdminDto> {
    const courierSetting = await this.courierSettingDomainService.updateOrCreateByCourierId(courierId, data)

    const dto = new CourierFullSettingsAdminDto(courierSetting)
    return dto
  }
}
