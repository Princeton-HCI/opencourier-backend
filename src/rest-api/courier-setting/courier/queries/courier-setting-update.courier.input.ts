import { ApiProperty } from '@nestjs/swagger'
import { EnumSettingDeliverySpeed, EnumSettingVehicleType, Prisma } from '@prisma/types'
import { IsArray, IsEnum, IsObject, IsOptional, IsString } from 'class-validator'
import { ICourierSettingUpdate } from 'src/domains/courier-setting/interfaces/ICourierSettingUpdate'
import { EnumCourierDietaryRestrictions } from 'src/shared-types/index'

export class CourierSettingUpdateCourierInput implements ICourierSettingUpdate {
  @ApiProperty({
    required: false,
    enum: EnumSettingVehicleType,
    nullable: true,
  })
  @IsEnum(EnumSettingVehicleType)
  @IsOptional()
  vehicleType: EnumSettingVehicleType | null

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  preferredAreas: string[]

  @ApiProperty({
    required: false,
    type: Object,
  })
  @IsObject()
  @IsOptional()
  shiftAvailability: Prisma.JsonValue | null

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  deliveryPreferences: string[]

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  foodPreferences: string[]

  @ApiProperty({
    required: false,
    type: Object,
  })
  @IsObject()
  @IsOptional()
  earningGoals: Prisma.JsonValue | null

  @ApiProperty({
    required: false,
    enum: EnumSettingDeliverySpeed,
    nullable: true,
  })
  @IsEnum(EnumSettingDeliverySpeed)
  @IsOptional()
  deliverySpeed: EnumSettingDeliverySpeed | null

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  restaurantTypes: string[]

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  cuisineTypes: string[]

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsString({ each: true })
  @IsOptional()
  preferredRestaurantPartners: string[]

  @ApiProperty({ enum: EnumCourierDietaryRestrictions, required: false, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(EnumCourierDietaryRestrictions, {
    each: true,
  })
  dietaryRestrictions: string[]

  @ApiProperty({
    required: false,
    type: Object,
  })
  @IsObject()
  @IsOptional()
  payRate: Prisma.JsonValue | null
}
