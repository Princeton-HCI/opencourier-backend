import { ApiProperty } from '@nestjs/swagger'
import { EnumUndeliverableAction } from '@prisma/types'
import { IsString } from 'class-validator'
import { IDeliveryUpdate } from 'src/domains/delivery/interfaces/IDeliveryUpdate'

export class ReportDeliveryIssueCourierInput implements Partial<IDeliveryUpdate> {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  undeliverableAction: EnumUndeliverableAction

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  undeliverableReason: string
}
