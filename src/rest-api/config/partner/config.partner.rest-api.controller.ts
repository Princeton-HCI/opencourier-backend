import * as swagger from '@nestjs/swagger'
import * as common from '@nestjs/common'
import { PARTNER_API_V1_PREFIX } from '../../../constants'
import { ConfigDomainService } from '../../../domains/config/config.domain.service'

@swagger.ApiBearerAuth()
@swagger.ApiTags('config')
@common.Controller(`${PARTNER_API_V1_PREFIX}/config`)
export class ConfigPartnerRestApiController {
  constructor(private readonly configDomainService: ConfigDomainService) {}
}
