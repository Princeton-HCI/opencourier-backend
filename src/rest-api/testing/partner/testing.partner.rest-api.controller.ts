import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { PARTNER_API_V1_PREFIX } from 'src/constants'
import { DeliveryMatchingService } from 'src/services/delivery-matching/delivery-matching.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('testing')
@common.Controller(`${PARTNER_API_V1_PREFIX}/testing`)
export class TestingPartnerRestApiController {
  constructor(private readonly deliveryMatchingService: DeliveryMatchingService) {}
}
