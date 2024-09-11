import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { COURIER_API_V1_PREFIX } from '../../../constants'
import { LocationNoteCourierPaginatedDto } from './dtos/location-note.courier.paginated.dto'
import { EnumLocationNoteActor, EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { LocationNoteFindManyCourierArgs } from './queries/location-note-find-many.courier.args'
import { CurrentUserCourier } from 'src/decorators/currentUserCourier.decorator'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { LocationNoteCourierDto } from './dtos/location-note.courier.dto'
import { LocationNoteCreateCourierInput } from './queries/location-note-create.courier.input'
import { LocationNoteRestApiCourierService } from './location-note.courier.rest-api.service'
import { LocationNoteReactCourierInput } from './queries/location-note-react.courier.input'
import { LocationNoteReactionCourierDto } from './dtos/location-note-reaction.courier.dto'
import { LocationNoteUpdateCourierInput } from './queries/location-note-update.courier.input'

@swagger.ApiBearerAuth()
@swagger.ApiTags('location-notes')
@common.Controller(`${COURIER_API_V1_PREFIX}/location-notes`)
export class LocationNoteCourierRestApiController {
  constructor(private readonly locationNoteRestApiCourierService: LocationNoteRestApiCourierService) {}

  @common.Post('')
  @swagger.ApiBody({
    type: LocationNoteCreateCourierInput,
  })
  @swagger.ApiCreatedResponse({
    type: LocationNoteCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Create a location note' })
  @Roles(EnumUserRole.COURIER)
  async createNote(
    @common.Body() data: LocationNoteCreateCourierInput,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<LocationNoteCourierDto> {
    const locationNote = await this.locationNoteRestApiCourierService.create({
      ...data,
      courierId: courier.id,
      actor: EnumLocationNoteActor.COURIER,
    })

    return new LocationNoteCourierDto(locationNote)
  }

  @common.Patch(':locationNoteId')
  @swagger.ApiBody({
    type: LocationNoteUpdateCourierInput,
  })
  @swagger.ApiCreatedResponse({
    type: LocationNoteCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Update a location note' })
  @Roles(EnumUserRole.COURIER)
  async updateNote(
    @common.Body() data: LocationNoteUpdateCourierInput,
    @common.Param('locationNoteId') locationNoteId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<LocationNoteCourierDto> {
    const locationNote = await this.locationNoteRestApiCourierService.update(locationNoteId, data.note, courier.id)

    return new LocationNoteCourierDto(locationNote)
  }

  @common.Post(':locationNoteId/react')
  @swagger.ApiBody({
    type: LocationNoteReactCourierInput,
  })
  @swagger.ApiCreatedResponse({
    type: LocationNoteReactionCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Add reaction to location note' })
  @Roles(EnumUserRole.COURIER)
  async reactToNote(
    @common.Body() data: LocationNoteReactCourierInput,
    @common.Param('locationNoteId') locationNoteId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<LocationNoteReactionCourierDto> {
    const locationNoteReaction = await this.locationNoteRestApiCourierService.addOrRemoveReaction(
      locationNoteId,
      courier.id,
      data.reaction
    )

    return new LocationNoteReactionCourierDto(locationNoteReaction)
  }

  @common.Get('')
  @swagger.ApiResponse({ type: LocationNoteCourierPaginatedDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get my location notes' })
  @Roles(EnumUserRole.COURIER)
  async getMyLocationNotes(
    @common.Query() args: LocationNoteFindManyCourierArgs,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<LocationNoteCourierPaginatedDto> {
    const orders = await this.locationNoteRestApiCourierService.getMany(
      {
        courierId: courier.id,
        locationId: args.locationId,
      },
      args.page,
      args.perPage
    )

    const dto = new LocationNoteCourierPaginatedDto(orders)
    return dto
  }

  @common.Get(':locationNoteId')
  @swagger.ApiResponse({ type: LocationNoteCourierDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get location note by id' })
  @Roles(EnumUserRole.COURIER)
  async getLocationNoteById(
    @common.Param('locationNoteId') locationNoteId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<LocationNoteCourierDto> {
    const orders = await this.locationNoteRestApiCourierService.getById(locationNoteId, courier.id)

    const dto = new LocationNoteCourierDto(orders)
    return dto
  }

  @common.Delete(':locationNoteId')
  @swagger.ApiResponse({ status: 204 })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Delete a location note' })
  @Roles(EnumUserRole.COURIER)
  async deleteLocationNote(
    @common.Param('locationNoteId') locationNoteId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<void> {
    await this.locationNoteRestApiCourierService.delete(locationNoteId, courier.id)
  }
}
