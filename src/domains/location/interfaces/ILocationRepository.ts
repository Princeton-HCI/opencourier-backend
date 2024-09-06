import { PaginatedResult } from 'src/core/models/Pagination'
import { LocationEntity } from '../entities/location.entity'
import { LocationWhereArgs } from '../types/location-where-args.type'
import { Exact } from 'src/types'
import { ILocationCreate } from './ILocationCreate'
import { LocationFindByAddressArgs } from '../types/location-find-by-address-args.type'

export interface ILocationRepository {
  create(data: Exact<ILocationCreate>): Promise<LocationEntity>
  findByIds(locationIds: string[]): Promise<LocationEntity[]>
  findById(locationId: string): Promise<LocationEntity | null>
  findByIdOrThrow(locationId: string): Promise<LocationEntity>
  findByAddress(input: LocationFindByAddressArgs): Promise<LocationEntity | null>
  findManyPaginated(args: LocationWhereArgs, page?: number, perPage?: number): Promise<PaginatedResult<LocationEntity>>
}
