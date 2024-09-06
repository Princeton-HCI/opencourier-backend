import { ConfigService } from '@nestjs/config'
import { JWT_REFRESH_SECRET_KEY, JWT_SECRET_KEY } from '../../../constants'

export const jwtSecretFactory = {
  provide: JWT_SECRET_KEY,
  useFactory: (configService: ConfigService): Promise<string> => {
    const secret = configService.get(JWT_SECRET_KEY)
    if (secret) {
      return secret
    }
    throw new Error('jwtSecretFactory missing secret')
  },
  inject: [ConfigService],
}

export const jwtRefreshSecretFactory = {
  provide: JWT_REFRESH_SECRET_KEY,
  useFactory: (configService: ConfigService): Promise<string> => {
    const secret = configService.get(JWT_REFRESH_SECRET_KEY)
    if (secret) {
      return secret
    }
    throw new Error('jwtRefreshSecretFactory missing secret')
  },
  inject: [ConfigService],
}
