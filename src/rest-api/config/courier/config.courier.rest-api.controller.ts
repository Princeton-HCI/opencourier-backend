import * as swagger from '@nestjs/swagger'
import * as common from '@nestjs/common'
import { COURIER_API_V1_PREFIX } from '../../../constants'
import { ConfigDomainService } from '../../../domains/config/config.domain.service'
import { AppVersionCustomerInput } from './queries/app-version.courier.input'
import { AppVersionCustomerDto } from './dtos/app-version.courier.dto'
import { Public } from '../../../decorators/public.decorator'

@swagger.ApiBearerAuth()
@swagger.ApiTags('config')
@common.Controller(`${COURIER_API_V1_PREFIX}/config`)
export class ConfigCourierRestApiController {
  constructor(private readonly configDomainService: ConfigDomainService) {}

  @Public()
  @common.Post('app-version')
  @swagger.ApiBody({
    type: AppVersionCustomerInput,
  })
  @swagger.ApiOkResponse({ type: AppVersionCustomerDto })
  async checkAppVersion(@common.Body() data: AppVersionCustomerInput): Promise<AppVersionCustomerDto> {
    const result = await this.configDomainService.checkCourierAppVersion(data)
    return new AppVersionCustomerDto(result)
  }

}
