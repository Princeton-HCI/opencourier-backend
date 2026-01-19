import { Module } from '@nestjs/common'
import { ConfigPublicRestApiModule } from './config/public/config.public.rest-api.module'

@Module({
  imports: [ConfigPublicRestApiModule],
})
export class PublicRestApiModule {}
