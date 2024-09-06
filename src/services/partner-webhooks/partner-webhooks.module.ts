import { Global, Module } from '@nestjs/common'
import { PartnerWebhookService } from './partner-webhooks.service'
import { HttpModule } from '@nestjs/axios'

@Global()
@Module({
  imports: [HttpModule],
  providers: [PartnerWebhookService],
  exports: [PartnerWebhookService],
})
export class PartnerWebhookModule {}
