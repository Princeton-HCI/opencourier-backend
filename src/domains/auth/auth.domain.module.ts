import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthDomainService } from './auth.domain.service'
import { TokenService } from './token.service'
import { JWT_EXPIRATION, JWT_REFRESH_SECRET_KEY, JWT_SECRET_KEY } from '../../constants'
import { PassportModule } from '@nestjs/passport'
import { PasswordService } from './password.service'
import { JwtStrategy } from './jwt/jwt.strategy'
import { jwtRefreshSecretFactory, jwtSecretFactory } from './jwt/jwtSecretFactory'
import { UserDomainModule } from '../user/user.domain.module'
import { CourierDomainModule } from '../courier/courier.domain.module'
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy'

@Global()
@Module({
  imports: [
    PassportModule,
    UserDomainModule,
    CourierDomainModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get(JWT_SECRET_KEY)
        const refreshSecret = configService.get(JWT_REFRESH_SECRET_KEY)
        const expiresIn = configService.get(JWT_EXPIRATION)
        if (!secret) {
          throw new Error("Didn't get a valid jwt secret")
        }
        if (!refreshSecret) {
          throw new Error("Didn't get a valid jwt refresh secret")
        }
        if (!expiresIn) {
          throw new Error('Jwt expire in value is not valid')
        }
        return {
          secret: secret,
          refreshSecret: refreshSecret,
          signOptions: { expiresIn },
        }
      },
    }),
  ],
  providers: [
    AuthDomainService,
    PasswordService,
    JwtStrategy,
    JwtRefreshStrategy,
    jwtSecretFactory,
    jwtRefreshSecretFactory,
    TokenService,
    ConfigService
  ],
  exports: [AuthDomainService, PasswordService],
})
export class AuthDomainModule {}
