import { Injectable, Logger } from '@nestjs/common'
import { LocationRepository } from 'src/persistence/repositories/location.repository'
import { LocationWhereArgs } from './types/location-where-args.type'
import { ILocationFindOrCreate } from './interfaces/ILocationFindOrCreate'
import { ILocationUpdate } from './interfaces/ILocationUpdate'

@Injectable()
export class LocationDomainService {
  private readonly logger = new Logger(LocationDomainService.name)
  constructor(private locationRepository: LocationRepository) {}

  async getById(locationId: string) {
    const location = await this.locationRepository.findById(locationId)

    return location
  }

  async getByIds(locationIds: string[]) {
    const location = await this.locationRepository.findByIds(locationIds)

    return location
  }

  async findOrCreate(input: ILocationFindOrCreate) {
    const location = await this.locationRepository.findByAddress({
      street: input.streetAddress[0] ? input.streetAddress[0] : null,
      countryCode: input.countryCode,
      zipCode: input.zipCode,
      state: input.state,
      latitude: input.latitude,
      longitude: input.longitude,
    })

    if (location) {
      return location
    }

    const newLocation = await this.locationRepository.create({
      street: input.streetAddress[0],
      city: input.city,
      zipCode: input.zipCode,
      state: input.state,
      countryCode: input.countryCode,
      stateCode: input.state,
      latitude: input.latitude,
      longitude: input.longitude,
      houseNumber: input.houseNumber,
      formattedAddress: '',
    })

    return newLocation
  }

  async update(locationId: string, input: ILocationUpdate) {
    const updatedLocation = await this.locationRepository.update(locationId, input)

    return updatedLocation
  }

  async getByIdOrThrow(locationId: string) {
    const location = await this.locationRepository.findByIdOrThrow(locationId)

    return location
  }

  async getMany(args: LocationWhereArgs, page?: number, perPage?: number) {
    const locations = await this.locationRepository.findManyPaginated(args, page, perPage)

    return locations
  }
}
