import { ApiProperty } from '@nestjs/swagger'
import { EnumSettingDeliverySpeed, EnumSettingVehicleType, Prisma } from '@prisma/types'
import { CourierSettingEntity } from 'src/domains/courier-setting/entities/courier-setting.entity'
import { EnumCourierDietaryRestrictions } from 'src/shared-types/index'

export class CourierFullSettingsCourierDto implements Partial<CourierSettingEntity> {
  @ApiProperty({ enum: EnumSettingVehicleType, nullable: true })
  vehicleType: EnumSettingVehicleType | null

  @ApiProperty({ type: [String] })
  preferredAreas: string[]

  @ApiProperty({ type: Object, nullable: true })
  shiftAvailability: Prisma.JsonValue | null

  @ApiProperty({ type: [String] })
  deliveryPreferences: string[]

  @ApiProperty({ type: [String] })
  foodPreferences: string[]

  @ApiProperty({ type: Object, nullable: true })
  earningGoals: Prisma.JsonValue | null

  @ApiProperty({ enum: EnumSettingDeliverySpeed, nullable: true })
  deliverySpeed: EnumSettingDeliverySpeed | null

  @ApiProperty({ type: [String] })
  restaurantTypes: string[]

  @ApiProperty({ type: [String] })
  cuisineTypes: string[]

  @ApiProperty({ type: [String] })
  preferredRestaurantPartners: string[]

  @ApiProperty({ enum: EnumCourierDietaryRestrictions, isArray: true })
  dietaryRestrictions: EnumCourierDietaryRestrictions[]

  @ApiProperty({ type: Object, nullable: true })
  payRate: Prisma.JsonValue | null

  @ApiProperty({ type: String, nullable: true })
  courierId: string | null

  constructor(data: CourierSettingEntity | null) {
    if (!data) return

    this.vehicleType = data.vehicleType
    this.preferredAreas = data.preferredAreas
    this.shiftAvailability = data.shiftAvailability
    this.deliveryPreferences = data.deliveryPreferences
    this.foodPreferences = data.foodPreferences
    this.earningGoals = data.earningGoals
    this.deliverySpeed = data.deliverySpeed
    this.restaurantTypes = data.restaurantTypes
    this.cuisineTypes = data.cuisineTypes
    this.preferredRestaurantPartners = data.preferredRestaurantPartners
    this.dietaryRestrictions = data.dietaryRestrictions.map((item) => item as EnumCourierDietaryRestrictions)
    this.payRate = data.payRate
    this.courierId = data.courierId
  }
}
