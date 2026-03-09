import { ApiProperty } from '@nestjs/swagger'
import { EnumCountryCode } from '@prisma/types'
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator'

export class ManualRequestAddressAdminInput {
  @ApiProperty({ required: true, type: [String], description: 'Street name(s)' })
  @IsArray()
  @IsString({ each: true })
  streetAddress: string[]

  @ApiProperty({ required: true, type: String })
  @IsString()
  city: string

  @ApiProperty({ required: true, type: String })
  @IsString()
  state: string

  @ApiProperty({ required: true, type: String })
  @IsString()
  zipCode: string

  @ApiProperty({ required: true, enum: EnumCountryCode })
  @IsEnum(EnumCountryCode)
  countryCode: EnumCountryCode

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  houseNumber?: string
}
