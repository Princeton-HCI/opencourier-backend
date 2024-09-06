import { PaginatedResult } from 'src/core/models/Pagination'
import { DeliveryWhereUniqueArgs } from '../types/delivery-where-unique-args.type'
import { DeliveryWhereArgs } from '../types/delivery-where-args.type'
import { IDeliveryUpdate } from './IDeliveryUpdate'
import { DeliveryEntity } from '../entities/delivery.entity'
import { IDeliveryCreate } from './IDeliveryCreate'

export interface IDeliveryRepository {
  create(input: IDeliveryCreate): Promise<DeliveryEntity>
  update(deliveryId: string, input: IDeliveryUpdate): Promise<DeliveryEntity>
  findById(deliveryId: string, otherFilters?: DeliveryWhereArgs): Promise<DeliveryEntity | null>
  findByDeliveryQuoteId(deliveryQuoteId: string): Promise<DeliveryEntity | null>
  findByIdOrThrow(deliveryId: string, otherFilters?: DeliveryWhereUniqueArgs): Promise<DeliveryEntity>
  findManyPaginated(data: DeliveryWhereArgs, page?: number, perPage?: number): Promise<PaginatedResult<DeliveryEntity>>
}
