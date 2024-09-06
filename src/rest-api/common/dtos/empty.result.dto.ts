import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class EmptyResultDto {
  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @Type(() => Boolean)
  ok: true
}
