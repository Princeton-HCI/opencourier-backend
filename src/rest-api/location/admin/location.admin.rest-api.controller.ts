import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { ADMIN_API_V1_PREFIX } from 'src/constants'
import { LocationAdminPaginatedDto } from './dtos/location.admin.paginated.dto'
import { LocationFindManyAdminArgs } from './queries/location-find-many.admin.args'
import { LocationAdminDto } from './dtos/location.admin.dto'
import { LocationDomainService } from 'src/domains/location/location.domain.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('locations')
@common.Controller(`${ADMIN_API_V1_PREFIX}/locations`)
export class LocationAdminRestApiController {
  constructor(private readonly locationDomainService: LocationDomainService) {}

  @common.Get('')
  @swagger.ApiBody({ type: LocationFindManyAdminArgs })
  @swagger.ApiResponse({ type: LocationAdminPaginatedDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get locations' })
  @Roles(EnumUserRole.ADMIN)
  async getLocations(@common.Query() args: LocationFindManyAdminArgs): Promise<LocationAdminPaginatedDto> {
    const locations = await this.locationDomainService.getMany({}, args.page, args.perPage)

    const dto = new LocationAdminPaginatedDto(locations)
    return dto
  }

  @common.Get(':locationId')
  @swagger.ApiResponse({ type: LocationAdminDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get location by id' })
  @Roles(EnumUserRole.ADMIN)
  async getMyOrders(@common.Param('locationId') locationId: string): Promise<LocationAdminDto> {
    const location = await this.locationDomainService.getByIdOrThrow(locationId)

    const dto = new LocationAdminDto(location)
    return dto
  }
}
