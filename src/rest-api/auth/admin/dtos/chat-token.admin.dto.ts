import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ChatTokenAdminDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  chatToken: string

  constructor(data: { chatToken: string }) {
    this.chatToken = data.chatToken
  }
}
