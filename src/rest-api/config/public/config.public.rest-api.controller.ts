import * as swagger from '@nestjs/swagger'
import * as common from '@nestjs/common'
import { PUBLIC_API_V1_PREFIX } from '../../../constants'
import { ConfigDomainService } from '../../../domains/config/config.domain.service'
import { UserDomainService } from '../../../domains/user/user.domain.service'
import { MetadataPublicDto } from './dtos/metadata.public.dto'
import { Public } from '../../../decorators/public.decorator'

@swagger.ApiTags('config')
@common.Controller(`${PUBLIC_API_V1_PREFIX}/config`)
export class ConfigPublicRestApiController {
  constructor(
    private readonly configDomainService: ConfigDomainService,
    private readonly userDomainService: UserDomainService
  ) {}

  @Public()
  @common.Get('metadata')
  @swagger.ApiQuery({
    name: 'instanceLink',
    type: String,
    required: true,
    description: 'The instance link',
  })
  @swagger.ApiOkResponse({ type: MetadataPublicDto })
  @swagger.ApiNotFoundResponse({ description: 'Instance not found' })
  async getMetadata(@common.Query('instanceLink') instanceLink: string): Promise<MetadataPublicDto> {
    const instanceConfig = await this.configDomainService.instanceConfig.getInstanceConfigSettings()
    const userCount = await this.userDomainService.countAll()

    if (!instanceConfig.details) {
      throw new common.NotFoundException('Instance details not found')
    }

    if (instanceConfig.details.link !== instanceLink) {
      throw new common.NotFoundException('Instance not found')
    }

    return new MetadataPublicDto(instanceConfig, userCount)
  }
}
