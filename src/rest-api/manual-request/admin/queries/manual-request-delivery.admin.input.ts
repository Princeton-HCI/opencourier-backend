import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { ManualRequestQuoteAdminInput } from './manual-request-quote.admin.input'

export class ManualRequestDeliveryAdminInput extends ManualRequestQuoteAdminInput {
  @ApiProperty({
    required: true,
    type: String,
    description: 'The quote ID returned from POST /manual-request/quote',
  })
  @IsString()
  quoteId: string
}
