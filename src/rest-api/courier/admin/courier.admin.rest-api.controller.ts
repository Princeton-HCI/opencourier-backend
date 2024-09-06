import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { ADMIN_API_V1_PREFIX } from '../../../constants'
import { CourierDomainService } from '../../../domains/courier/courier.domain.service'
import * as errors from '../../../errors'
import { Roles } from 'src/decorators/roles.decorator'
import { EnumUserRole } from '@prisma/types'
import { CourierPaginatedAdminDto } from './dtos/courier.admin.paginated.dto'
import { CourierFindManyAdminArgs } from './queries/courier-find-many.admin.args'
import { CourierAdminDto } from './dtos/courier.admin.dto'
import { CourierUpdateAdminInput } from './queries/courier-update.admin.input'

@swagger.ApiBearerAuth()
@swagger.ApiTags('courier')
@common.Controller(`${ADMIN_API_V1_PREFIX}/courier`)
export class CourierAdminRestApiController {
  constructor(private readonly courierDomainService: CourierDomainService) {}

  @common.Get('')
  @swagger.ApiResponse({ type: CourierPaginatedAdminDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get many couriers' })
  @Roles(EnumUserRole.ADMIN)
  async getManyCouriers(@common.Query() args: CourierFindManyAdminArgs): Promise<CourierPaginatedAdminDto> {
    const couriers = await this.courierDomainService.getManyCouriers(args.page, args.perPage)

    const dto = new CourierPaginatedAdminDto(couriers)
    return dto
  }

  @common.Get(':id')
  @swagger.ApiResponse({ type: CourierAdminDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get courier by id' })
  @Roles(EnumUserRole.ADMIN)
  async getCourierById(@common.Param('id') id: string): Promise<CourierAdminDto> {
    const courier = await this.courierDomainService.getByIdOrThrow(id)

    const dto = new CourierAdminDto(courier)
    return dto
  }

  @common.Patch(':id')
  @swagger.ApiBody({
    type: CourierUpdateAdminInput,
  })
  @swagger.ApiOkResponse({
    type: CourierAdminDto,
  })
  @swagger.ApiNotFoundResponse({
    type: errors.NotFoundException,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Update a courier' })
  @Roles(EnumUserRole.ADMIN)
  async updateCourier(
    @common.Param('id') id: string,
    @common.Body() data: CourierUpdateAdminInput
  ): Promise<CourierAdminDto> {
    const courier = await this.courierDomainService.update(id, data)

    const dto = new CourierAdminDto(courier)
    return dto
  }
}
