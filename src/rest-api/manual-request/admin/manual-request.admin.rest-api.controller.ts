import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import * as errors from 'src/errors'
import { EnumDeliveryEventType, EnumUserRole } from '@prisma/types'
import { Roles } from 'src/decorators/roles.decorator'
import { ADMIN_API_V1_PREFIX } from 'src/constants'
import { ManualRequestAdminRestApiService } from './manual-request.admin.rest-api.service'
import { ManualRequestQuoteAdminInput } from './queries/manual-request-quote.admin.input'
import { ManualRequestDeliveryAdminInput } from './queries/manual-request-delivery.admin.input'
import { ManualRequestQuoteAdminDto } from './dtos/manual-request-quote.admin.dto'
import { ManualRequestDeliveryAdminDto } from './dtos/manual-request-delivery.admin.dto'
import { DeliverySubmitEventAdminInput } from 'src/rest-api/delivery/admin/queries/delivery-submit-event.admin.input'
import { DeliveryDomainService } from 'src/domains/delivery/delivery.domain.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('manual-request')
@common.Controller(`${ADMIN_API_V1_PREFIX}/manual-request`)
export class ManualRequestAdminRestApiController {
  constructor(
    private readonly manualRequestService: ManualRequestAdminRestApiService,
    private readonly deliveryDomainService: DeliveryDomainService,
  ) {}

  /**
   * Step 1: Get an estimate (quote) for a delivery before committing.
   */
  @common.Post('quote')
  @swagger.ApiBody({ type: ManualRequestQuoteAdminInput })
  @swagger.ApiOkResponse({ type: ManualRequestQuoteAdminDto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiOperation({
    summary: 'Get a delivery price estimate and ETA',
    description: 'Creates a quote (estimate) from pickup/dropoff info. No delivery is committed.',
  })
  @Roles(EnumUserRole.ADMIN)
  async createQuote(
    @common.Body() data: ManualRequestQuoteAdminInput,
  ): Promise<ManualRequestQuoteAdminDto> {
    const quote = await this.manualRequestService.createQuote(data)
    return new ManualRequestQuoteAdminDto(quote)
  }

  /**
   * Step 2: Confirm a delivery using the quote ID from Step 1.
   */
  @common.Post('delivery')
  @swagger.ApiBody({ type: ManualRequestDeliveryAdminInput })
  @swagger.ApiOkResponse({ type: ManualRequestDeliveryAdminDto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiOperation({
    summary: 'Confirm and create a delivery from an existing quote',
    description: 'Commits the delivery after the operator has reviewed the estimate.',
  })
  @Roles(EnumUserRole.ADMIN)
  async confirmDelivery(
    @common.Body() data: ManualRequestDeliveryAdminInput,
  ): Promise<ManualRequestDeliveryAdminDto> {
    const delivery = await this.manualRequestService.confirmDelivery(data)
    return new ManualRequestDeliveryAdminDto(delivery)
  }

  /**
   * Get a single delivery by ID (for status polling).
   */
  @common.Get('delivery/:deliveryId')
  @swagger.ApiOkResponse({ type: ManualRequestDeliveryAdminDto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiOperation({ summary: 'Get delivery status and details' })
  @Roles(EnumUserRole.ADMIN)
  async getDelivery(
    @common.Param('deliveryId') deliveryId: string,
  ): Promise<ManualRequestDeliveryAdminDto> {
    const delivery = await this.deliveryDomainService.getByIdOrThrow(deliveryId)
    return new ManualRequestDeliveryAdminDto(delivery)
  }

  /**
   * Cancel a delivery.
   */
  @common.Post('delivery/:deliveryId/cancel')
  @swagger.ApiOkResponse({ type: ManualRequestDeliveryAdminDto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiOperation({ summary: 'Cancel a delivery' })
  @Roles(EnumUserRole.ADMIN)
  async cancelDelivery(
    @common.Param('deliveryId') deliveryId: string,
  ): Promise<ManualRequestDeliveryAdminDto> {
    // Cancel is a state machine event – delegate to the existing submit-event mechanism
    const result = await this.deliveryDomainService.submitDeliveryEvent({
      deliveryId,
      eventType: EnumDeliveryEventType.CANCELED,
    })
    return new ManualRequestDeliveryAdminDto(result)
  }

  /**
   * Submit any state machine event for a delivery (utility for the status page).
   */
  @common.Post('delivery/:deliveryId/event')
  @swagger.ApiBody({ type: DeliverySubmitEventAdminInput })
  @swagger.ApiOkResponse({ type: ManualRequestDeliveryAdminDto })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiOperation({ summary: 'Submit a lifecycle event for a delivery' })
  @Roles(EnumUserRole.ADMIN)
  async submitDeliveryEvent(
    @common.Param('deliveryId') deliveryId: string,
    @common.Body() data: DeliverySubmitEventAdminInput,
  ): Promise<ManualRequestDeliveryAdminDto> {
    const result = await this.deliveryDomainService.submitDeliveryEvent({ ...data, deliveryId })
    return new ManualRequestDeliveryAdminDto(result)
  }
}
