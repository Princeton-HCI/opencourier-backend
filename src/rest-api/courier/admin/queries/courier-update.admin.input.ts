import { ApiProperty } from '@nestjs/swagger'
import { EnumCourierDeliverySetting, EnumCourierStatus, EnumStripeAccountStatus } from '@prisma/types'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { ICourierUpdate } from '../../../../domains/courier/interfaces/ICourierUpdate'

export class CourierUpdateAdminInput implements ICourierUpdate {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  firstName: string

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  lastName: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  node_uri: string

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  phoneNumber: string | null

  @ApiProperty({
    required: false,
    enum: EnumCourierStatus,
  })
  @IsEnum(EnumCourierStatus)
  @IsOptional()
  status: EnumCourierStatus

  @ApiProperty({
    required: false,
    enum: EnumCourierDeliverySetting,
  })
  @IsEnum(EnumCourierDeliverySetting)
  @IsOptional()
  deliverySetting: EnumCourierDeliverySetting

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  stripeAccountId: string | null

  @ApiProperty({
    required: false,
    enum: EnumStripeAccountStatus,
  })
  @IsEnum(EnumStripeAccountStatus)
  @IsOptional()
  stripeAccountStatus: EnumStripeAccountStatus
}
