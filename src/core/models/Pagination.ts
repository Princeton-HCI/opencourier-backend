export interface PaginatedResult<T> {
  data: T[]
  pagination?: Pagination
}

export interface Pagination {
  perPage: number
  totalItems: number
  totalPages: number
  currentItems: number
  currentPage: number
  prevPage: number | null
  nextPage: number | null
}

export type PaginateOptions = { page?: number; perPage?: number }
export type PaginateFunction<T, K> = (model: any, args: K, options: PaginateOptions) => Promise<PaginatedResult<T>>
