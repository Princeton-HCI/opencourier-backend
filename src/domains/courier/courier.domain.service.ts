import { Injectable, Logger } from '@nestjs/common'
import { ICourierCreate } from './interfaces/ICourierCreate'
import { CourierRepository } from 'src/persistence/repositories/courier.repository'
import { ICourierUpdate } from './interfaces/ICourierUpdate'
import { ICourierUpdateLocation } from './interfaces/ICourierUpdateLocation'
import { ICourierFindNearestArgs } from './interfaces/ICourierFindNearestArgs'
import { ICourierFindBySeniorityArgs } from './interfaces/ICourierFindBySeniorityArgs'
import { EnumCourierDeliverySetting, EnumCourierStatus } from '@prisma/types'

@Injectable()
export class CourierDomainService {
  private readonly logger = new Logger(CourierDomainService.name)
  constructor(private courierRepository: CourierRepository) {}

  async create(input: ICourierCreate) {
    const { userId, firstName, lastName } = input

    const courier = await this.courierRepository.create({
      userId,
      firstName,
      lastName,
    })

    return courier
  }

  async hasActiveDelivery(courierId: string): Promise<boolean> {
    // Use repository instead of direct Prisma access
    return await this.courierRepository.hasActiveDelivery(courierId)
  }


  async update(id: string, input: ICourierUpdate) {
    const courier = await this.courierRepository.updateById(id, input)

    return courier
  }

  async getNearestAvailableCourier(args: ICourierFindNearestArgs) {
    const courier = await this.courierRepository.findNearestAvailableCourier(args)

    return courier
  }

  
  async findAllAvailable(options: { excludeIds?: string[] } = {}) {
    const { excludeIds = [] } = options
    
    try {
      // Get all couriers first
      const paginatedResult = await this.courierRepository.findManyPaginated(1, 20) // Modify to set a larger limit
      const allCouriers = paginatedResult.data
      
        // Map couriers to an array of promises
    const courierChecks = allCouriers.map(async courier => {
      // Skip excluded couriers
      if (excludeIds.includes(courier.id)) {
        return null
      }
      
      // Check if courier is online
      if (courier.status !== 'ONLINE' && courier.status !== 'LAST_CALL') {
        return null
      }
      
      // Check if courier has a valid location
      const location = await this.courierRepository.getCurrentLocation(courier.id)
      if (!location) {
        return null
      }
      
      // Check if courier has an ongoing delivery
      const hasActiveDelivery = await this.courierRepository.hasActiveDelivery(courier.id)
                
      if (hasActiveDelivery) {
        return null
      }
      
      // Courier passes all checks
      courier.currentLocation = location
      return courier
    })
    
    // Wait for all promises to resolve and filter out null values
    const availableCouriers = (await Promise.all(courierChecks)).filter(Boolean)
    
    return availableCouriers
  } catch (error) {
    this.logger.error('Error finding available couriers', error)
    return []
  }
}

  async getMostSeniorAvailableCourier(args: ICourierFindBySeniorityArgs) {
    const courier = await this.courierRepository.findMostSeniorAvailableCourier(args)

    return courier
  }

  async getManyCouriers(page?: number, perPage?: number) {
    const couriers = await this.courierRepository.findManyPaginated(page, perPage)

    return couriers
  }

  async getByIdOrThrow(id: string) {
    const courier = await this.courierRepository.findByIdOrThrow(id)

    return courier
  }

  async getByIdWithSettings(id: string) {
    const courierWithSettings = await this.courierRepository.findByIdWithSettings(id)

    return courierWithSettings
  }

  async getByUserId(id: string) {
    const courier = await this.courierRepository.findByUserId(id)

    return courier
  }

  async updateCurrentLocation(id: string, input: ICourierUpdateLocation) {
    const courier = await this.courierRepository.updateCurrentLocationById(id, input)

    return courier
  }

  async getCurrentLocation(id: string) {
    const courier = await this.courierRepository.getCurrentLocation(id)

    return courier
  }

  async updateStatus(id: string, status: EnumCourierStatus) {
    const result = await this.courierRepository.updateStatus(id, status)

    return result
  }
  
  async updateDeliverySetting(id: string, deliverySetting: EnumCourierDeliverySetting) {
    const result = await this.courierRepository.updateDeliverySetting(id, deliverySetting)

    return result
  }
}
