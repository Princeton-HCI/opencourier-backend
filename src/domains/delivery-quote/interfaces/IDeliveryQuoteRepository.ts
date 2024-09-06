import { PaginatedResult } from 'src/core/models/Pagination'
import { DeliveryQuoteEntity } from '../entities/delivery-quote.entity'
import { DeliveryQuoteWhereArgs } from '../types/delivery-quote-where-args.type'
import { DeliveryQuoteWhereUniqueArgs } from '../types/delivery-quote-where-unique-args.type'

export interface IDeliveryQuoteRepository {
  findById(deliveryId: string, otherFilters?: DeliveryQuoteWhereArgs): Promise<DeliveryQuoteEntity | null>
  findByIdOrThrow(deliveryId: string, otherFilters?: DeliveryQuoteWhereUniqueArgs): Promise<DeliveryQuoteEntity>
  findManyPaginated(
    data: DeliveryQuoteWhereArgs,
    page?: number,
    perPage?: number
  ): Promise<PaginatedResult<DeliveryQuoteEntity>>
}
