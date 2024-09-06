import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { type Types } from 'ably'

export class AblyTokenDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  keyName: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @Type(() => String)
  clientId?: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  capability: string

  @ApiProperty({
    required: true,
    type: Number,
  })
  @Type(() => Number)
  timestamp: number

  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  nonce: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @Type(() => String)
  mac: string

  constructor(tokenRequest: Types.TokenRequest) {
    this.keyName = tokenRequest.keyName
    this.clientId = tokenRequest.clientId
    this.capability = tokenRequest.capability
    this.timestamp = tokenRequest.timestamp
    this.nonce = tokenRequest.nonce
    this.mac = tokenRequest.mac
  }
}
