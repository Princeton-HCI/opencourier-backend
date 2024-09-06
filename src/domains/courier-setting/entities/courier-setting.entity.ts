import { CourierSetting, EnumSettingDeliverySpeed, EnumSettingVehicleType, Prisma } from '@prisma/types'

export class CourierSettingEntity implements CourierSetting {
  id: string
  vehicleType: EnumSettingVehicleType | null
  preferredAreas: string[]
  shiftAvailability: Prisma.JsonValue | null
  deliveryPreferences: string[]
  foodPreferences: string[]
  earningGoals: Prisma.JsonValue | null
  deliverySpeed: EnumSettingDeliverySpeed | null
  restaurantTypes: string[]
  cuisineTypes: string[]
  preferredRestaurantPartners: string[]
  dietaryRestrictions: string[]
  payRate: Prisma.JsonValue | null
  createdAt: Date
  updatedAt: Date
  courierId: string | null

  constructor(data: CourierSetting) {
    this.id = data.id
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
    this.dietaryRestrictions = data.dietaryRestrictions
    this.payRate = data.payRate
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.courierId = data.courierId
  }
}
