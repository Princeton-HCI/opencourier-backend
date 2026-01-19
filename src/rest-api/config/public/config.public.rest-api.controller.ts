import * as swagger from '@nestjs/swagger'
import * as common from '@nestjs/common'
import { PUBLIC_API_V1_PREFIX } from '../../../constants'
import { ConfigDomainService } from '../../../domains/config/config.domain.service'
import { InstanceConfigPublicDto } from './dtos/instance-config.public.dto'
import { Public } from '../../../decorators/public.decorator'
import { InstanceLinkInput } from './queries/instance-link.input'

@swagger.ApiTags('config')
@common.Controller(`${PUBLIC_API_V1_PREFIX}/config`)
export class ConfigPublicRestApiController {
  constructor(private readonly configDomainService: ConfigDomainService) {}

  @Public()
  @common.Get('instance-config')
  @swagger.ApiQuery({
    name: 'instanceLink',
    type: String,
    required: true,
    description: 'The instance link',
  })
  @swagger.ApiOkResponse({ type: InstanceConfigPublicDto })
  @swagger.ApiNotFoundResponse({ description: 'Instance not found' })
  async getInstanceConfig(@common.Query('instanceLink') instanceLink: string): Promise<InstanceConfigPublicDto> {
    const instanceConfig = await this.configDomainService.instanceConfig.getInstanceConfigSettings()

    if (!instanceConfig.metadata) {
      throw new common.NotFoundException('Instance metadata not found')
    }

    if (instanceConfig.metadata.link !== instanceLink) {
      throw new common.NotFoundException('Instance not found')
    }

    return new InstanceConfigPublicDto(instanceConfig)
  }
}
