import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { IDeliveryUpdate } from 'src/domains/delivery/interfaces/IDeliveryUpdate'

export class MarkDeliveryAsDeliveredCourierInput implements Partial<IDeliveryUpdate> {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  note?: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @Transform(({ value }) => Buffer.from(value))
  @IsOptional()
  imageData?: Buffer

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  imageName?: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  imageType?: string
}
