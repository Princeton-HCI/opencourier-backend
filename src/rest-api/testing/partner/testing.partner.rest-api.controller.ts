import * as common from '@nestjs/common'
import * as swagger from '@nestjs/swagger'
import { PARTNER_API_V1_PREFIX } from 'src/constants'
import { HungarianCourierMatcherService } from 'src/services/courier-matcher/hungarian-courier-matcher.service'
import { DeliveryMatchingService } from 'src/services/delivery-matching/delivery-matching.service'
import { ICourierMatcherInput } from 'src/services/courier-matcher/interfaces/ICourierMatcherInput';
import { ICourierMatcherResult } from 'src/services/courier-matcher/interfaces/ICourierMatcherResult';


@swagger.ApiBearerAuth()
@swagger.ApiTags('testing')
@common.Controller(`${PARTNER_API_V1_PREFIX}/testing`)
export class TestingPartnerRestApiController {
  constructor(
    private readonly deliveryMatchingService: DeliveryMatchingService,
    private readonly hungarianCourierMatcherService: HungarianCourierMatcherService
  ) {}

  @common.Post('batch-match-couriers')
  @swagger.ApiOperation({ summary: 'Batch match couriers to deliveries' })
  async batchMatchCouriersToDeliveries(
    @common.Body() deliveriesInput: ICourierMatcherInput[]
  ): Promise<ICourierMatcherResult[]> {
    return await this.hungarianCourierMatcherService.matchCouriersToDeliveries(deliveriesInput);
  }

}
