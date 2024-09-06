import { ApiProperty } from '@nestjs/swagger'
import { DeliveryAddress } from 'src/shared-types/index'
import { EnumCountryCode } from '@prisma/types'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class DeliveryAddressInput implements DeliveryAddress {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  streetAddress: string[]

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  city: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  state: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  zipCode: string

  @ApiProperty({
    required: true,
    enum: EnumCountryCode,
  })
  @IsEnum(EnumCountryCode)
  countryCode: EnumCountryCode

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  houseNumber?: string
}
