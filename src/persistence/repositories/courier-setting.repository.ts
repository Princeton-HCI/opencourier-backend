import { Injectable } from '@nestjs/common'
import { CourierSetting } from '@prisma/types'
import * as errors from '../../errors'

import { PrismaService } from '../../services/prisma/prisma.service'
import { EntityRepository } from '../EntityRepository'
import { ICourierSettingRepository } from '../../domains/courier-setting/interfaces/ICourierSettingRepository'
import { CourierSettingEntity } from '../../domains/courier-setting/entities/courier-setting.entity'
import { ICourierSettingUpdate } from '../../domains/courier-setting/interfaces/ICourierSettingUpdate'
import { Exact } from '../../types'

@Injectable()
export class CourierSettingRepository extends EntityRepository implements ICourierSettingRepository {
  constructor(prisma: PrismaService) {
    super(prisma)
  }

  async findByCourierId(courierId: string) {
    const result = await this.prisma.courierSetting.findFirst({
      where: {
        courierId: courierId,
      },
    })

    return result ? this.toDomain(result) : null
  }

  async findByCourierIdOrThrow(courierId: string) {
    const result = await this.prisma.courierSetting.findFirstOrThrow({
      where: {
        courierId: courierId,
      },
    })

    return this.toDomain(result)
  }

  async updateOrCreateByCourierId(courierId: string, data: Partial<ICourierSettingUpdate>) {
    const setting = await this.prisma.courierSetting.findFirst({
      where: {
        courierId: courierId,
      },
    })

    let newSettings: CourierSetting

    if (!setting) {
      newSettings = await this.prisma.courierSetting.create({
        data: {
          courierId: courierId,
          preferredAreas: data.preferredAreas,
          shiftAvailability: data.shiftAvailability as any,
          deliveryPreferences: data.deliveryPreferences,
          foodPreferences: data.foodPreferences,
          earningGoals: data.earningGoals as any,
          deliverySpeed: data.deliverySpeed,
          restaurantTypes: data.restaurantTypes,
          cuisineTypes: data.cuisineTypes,
          preferredRestaurantPartners: data.preferredRestaurantPartners,
          dietaryRestrictions: data.dietaryRestrictions,
          payRate: data.payRate as any,
          vehicleType: data.vehicleType,
        },
      })

      return this.toDomain(newSettings)
    }

    newSettings = await this.prisma.courierSetting.update({
      where: {
        id: setting.id,
      },
      data: {
        preferredAreas: data.preferredAreas,
        shiftAvailability: data.shiftAvailability as any,
        deliveryPreferences: data.deliveryPreferences,
        foodPreferences: data.foodPreferences,
        earningGoals: data.earningGoals as any,
        deliverySpeed: data.deliverySpeed,
        restaurantTypes: data.restaurantTypes,
        cuisineTypes: data.cuisineTypes,
        preferredRestaurantPartners: data.preferredRestaurantPartners,
        dietaryRestrictions: data.dietaryRestrictions,
        payRate: data.payRate as any,
        vehicleType: data.vehicleType,
      },
    })

    return this.toDomain(newSettings)
  }

  async updateByCourierId(courierId: string, data: Exact<ICourierSettingUpdate>) {
    const setting = await this.prisma.courierSetting.findFirstOrThrow({
      where: {
        courierId: courierId,
      },
    })
    if (!setting || !setting.courierId) {
      throw new errors.NotFoundException('Courier setting not found')
    }

    const result = await this.prisma.courierSetting.update({
      where: {
        id: setting.id,
      },
      data: {
        preferredAreas: data.preferredAreas,
        shiftAvailability: data.shiftAvailability as any,
        deliveryPreferences: data.deliveryPreferences,
        foodPreferences: data.foodPreferences,
        earningGoals: data.earningGoals as any,
        deliverySpeed: data.deliverySpeed,
        restaurantTypes: data.restaurantTypes,
        cuisineTypes: data.cuisineTypes,
        preferredRestaurantPartners: data.preferredRestaurantPartners,
        dietaryRestrictions: data.dietaryRestrictions,
        payRate: data.payRate as any,
        vehicleType: data.vehicleType,
      },
    })

    return this.toDomain(result)
  }

  private toDomain(data: CourierSetting) {
    return new CourierSettingEntity(data)
  }

  private toDomainMany(data: CourierSetting[]) {
    return data.map((d) => this.toDomain(d))
  }
}
