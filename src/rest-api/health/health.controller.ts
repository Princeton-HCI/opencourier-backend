import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'
import { Public } from '../../decorators/public.decorator'
import { NotFoundException } from '../../errors'
import { EmptyResultDto } from '../common/dtos/empty.result.dto'

@Controller('health')
export class HealthController {
  constructor(protected readonly healthService: HealthService) {}

  @Public()
  @Get('ready')
  healthLive(): EmptyResultDto {
    return new EmptyResultDto()
  }

  @Public()
  @Get('live')
  async healthReady(): Promise<EmptyResultDto> {
    const dbConnection = await this.healthService.isDbReady()
    if (!dbConnection) {
      throw new NotFoundException('alas')
    }
    return new EmptyResultDto()
  }
}
