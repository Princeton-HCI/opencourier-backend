import { ABLY_API_KEY } from '../../constants'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Realtime } from 'ably'

export const ablyClientFactory = {
  imports: [ConfigModule],
  inject: [ConfigService],
  provide: 'ablyClient',
  useFactory: (configService: ConfigService) => {
    const apiKey = configService.get<string>(ABLY_API_KEY)

    if (!apiKey) {
      throw new Error('Unable to find a valid ably apiKey for this environment')
    }

    return new Realtime.Promise(apiKey)
  },
  exports: ['ablyClient'],
}
