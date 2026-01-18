import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class InstanceLinkInput {
  @ApiProperty({ type: String, description: 'The instance link' })
  @IsString()
  @IsNotEmpty()
  instanceLink: string
}
