import { Injectable, Logger } from '@nestjs/common'
import { ConfigRepository } from '../../persistence/repositories/config.repository'
import { isRecordNotFoundError } from 'src/prisma.util'
import { InstanceConfigDomainService } from './instance-config.domain.service'
import { ConfigKey } from 'src/shared-types/index'

@Injectable()
export class ConfigDomainService {
  private readonly logger = new Logger(ConfigDomainService.name)
  readonly instanceConfig: InstanceConfigDomainService

  constructor(private readonly configRepository: ConfigRepository, instanceConfig: InstanceConfigDomainService) {
    this.instanceConfig = instanceConfig
  }

  async checkCourierAppVersion(data: { version: string }) {
    try {
      const config = await this.configRepository.getByKey(ConfigKey.COURIER_APP_MIN_VERSION)

      const requiredVersion = config.value.split('.')
      const currentVersion = data.version.split('.')
      let forceUpgrade = false

      for (let i = 0; i < requiredVersion.length; i++) {
        if (Number(currentVersion[i]) < Number(requiredVersion[i])) {
          forceUpgrade = true
          break
        }
      }

      return { forceUpgrade }
    } catch (error) {
      if (error instanceof Error && isRecordNotFoundError(error)) {
        return { forceUpgrade: false }
      }
      throw error
    }
  }
}
