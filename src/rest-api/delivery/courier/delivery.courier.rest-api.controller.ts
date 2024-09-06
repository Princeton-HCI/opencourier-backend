import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { COURIER_API_V1_PREFIX } from '../../../constants'
import { DeliveryCourierPaginatedDto } from './dtos/delivery.courier.paginated.dto'
import { EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { DeliveryFindManyCourierArgs } from './queries/delivery-find-many.courier.args'
import { CurrentUserCourier } from 'src/decorators/currentUserCourier.decorator'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'
import { DeliveryCourierDto } from './dtos/delivery.courier.dto'
import { DeliveryRestApiCourierService } from './delivery.courier.rest-api.service'
import { ReportDeliveryIssueCourierInput } from './queries/report-delivery-issue.courier.input'
import { MarkDeliveryAsDeliveredCourierInput } from './queries/mark-delivery-as-delivered.courier.input'
import { MarkDeliveryAsPickedUpCourierInput } from './queries/mark-delivery-as-picked-up.courier.input'
import { DeliveryWithNotesCourierPaginatedDto } from './dtos/delivery-with-notes.courier.paginated.dto'

@swagger.ApiBearerAuth()
@swagger.ApiTags('deliveries')
@common.Controller(`${COURIER_API_V1_PREFIX}/deliveries`)
export class DeliveryCourierRestApiController {
  constructor(private readonly deliveryRestApiCourierService: DeliveryRestApiCourierService) {}

  @common.Get('new')
  @swagger.ApiResponse({ type: DeliveryCourierPaginatedDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get my new deliveries' })
  @Roles(EnumUserRole.COURIER)
  async getMyNewDeliveries(
    @common.Query() args: DeliveryFindManyCourierArgs,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierPaginatedDto> {
    const deliveries = await this.deliveryRestApiCourierService.getMyNewDeliveries(courier.id, args.page, args.perPage)

    const dto = new DeliveryCourierPaginatedDto(deliveries)
    return dto
  }

  @common.Get('in-progress')
  @swagger.ApiResponse({ type: DeliveryWithNotesCourierPaginatedDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get my in progress' })
  @Roles(EnumUserRole.COURIER)
  async getMyInProgressDeliveries(
    @common.Query() args: DeliveryFindManyCourierArgs,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryWithNotesCourierPaginatedDto> {
    const deliveries = await this.deliveryRestApiCourierService.getMyInProgressDeliveriesWithNotes(
      courier.id,
      args.page,
      args.perPage
    )

    const dto = new DeliveryWithNotesCourierPaginatedDto(deliveries)
    return dto
  }

  @common.Get('done')
  @swagger.ApiResponse({ type: DeliveryCourierPaginatedDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get my new deliveries' })
  @Roles(EnumUserRole.COURIER)
  async getMyDoneDeliveries(
    @common.Query() args: DeliveryFindManyCourierArgs,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierPaginatedDto> {
    const deliveries = await this.deliveryRestApiCourierService.getMyDoneDeliveries(courier.id, args.page, args.perPage)

    const dto = new DeliveryCourierPaginatedDto(deliveries)
    return dto
  }

  @common.Get(':deliveryId')
  @swagger.ApiResponse({ type: DeliveryCourierDto })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiOperation({ summary: 'Get delivery by id' })
  @Roles(EnumUserRole.COURIER)
  async getMyDeliveryById(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.getByIdOrThrow(deliveryId, { courierId: courier.id })

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Patch(':deliveryId/report-issue')
  @swagger.ApiBody({
    type: ReportDeliveryIssueCourierInput,
  })
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Report an issue with the delivery' })
  @Roles(EnumUserRole.COURIER)
  async reportDeliveryIssue(
    @common.Param('deliveryId') deliveryId: string,
    @common.Body() input: ReportDeliveryIssueCourierInput,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.reportIssueWithTheDelivery(
      deliveryId,
      courier.id,
      input
    )

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Post(':deliveryId/accept')
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Accept a delivery' })
  @Roles(EnumUserRole.COURIER)
  async acceptDelivery(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.acceptDelivery(deliveryId, courier.id)

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Post(':deliveryId/reject')
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Reject a delivery' })
  @Roles(EnumUserRole.COURIER)
  async rejectDelivery(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.rejectDelivery(deliveryId, courier.id)

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Patch(':deliveryId/cancel')
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Cancel a delivery' })
  @Roles(EnumUserRole.COURIER)
  async cancelDelivery(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.cancelDelivery(deliveryId, courier.id)

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Post(':deliveryId/mark-as-delivered')
  @swagger.ApiBody({
    type: MarkDeliveryAsDeliveredCourierInput,
  })
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Mark as delivered' })
  @Roles(EnumUserRole.COURIER)
  async markAsDelivered(
    @common.Param('deliveryId') deliveryId: string,
    @common.Body() input: MarkDeliveryAsDeliveredCourierInput,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.markAsDelivered(deliveryId, courier.id, input)

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Post(':deliveryId/mark-as-dispatched')
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Mark as dispatched' })
  @Roles(EnumUserRole.COURIER)
  async markAsDispatched(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.markAsDispatched(deliveryId, courier.id)

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Post(':deliveryId/mark-as-picked-up')
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Mark as pickedup' })
  @Roles(EnumUserRole.COURIER)
  async markAsPickedUp(
    @common.Param('deliveryId') deliveryId: string,
    @common.Body() input: MarkDeliveryAsPickedUpCourierInput,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.markAsPickedUp(deliveryId, courier.id, {
      note: input.note,
    })

    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }

  @common.Post(':deliveryId/mark-as-on-the-way')
  @swagger.ApiCreatedResponse({
    type: DeliveryCourierDto,
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  @swagger.ApiOperation({ summary: 'Mark as on the way' })
  @Roles(EnumUserRole.COURIER)
  async markAsOnTheWay(
    @common.Param('deliveryId') deliveryId: string,
    @CurrentUserCourier() courier: CourierEntity
  ): Promise<DeliveryCourierDto> {
    const deliveries = await this.deliveryRestApiCourierService.markAsOnTheWay(deliveryId, courier.id)
    const dto = new DeliveryCourierDto(deliveries)
    return dto
  }
}
