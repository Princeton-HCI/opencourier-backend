import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsString } from 'class-validator'
import { IDeliveryUpdate } from 'src/domains/delivery/interfaces/IDeliveryUpdate'

export class MarkDeliveryAsDeliveredCourierInput implements Partial<IDeliveryUpdate> {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  note: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @Transform(({ value }) => Buffer.from(value))
  imageData: Buffer

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  imageName: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  imageType: string
}
