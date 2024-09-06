import { omit } from 'lodash'
import { PaginatedResult, PaginateFunction, PaginateOptions } from '../core/models/Pagination'

type WhereInput = {
  [key: string]: any
}

export type ArgsInput = {
  where?: WhereInput
  take?: number
  skip?: number
}

type ModelInput<T, Args extends ArgsInput> = {
  count(args?: Exclude<ArgsInput, 'take' | 'skip'>): Promise<number>
  findMany(args?: Args): Promise<T[]>
}

export function createPaginator<T, Args extends ArgsInput, Model extends ModelInput<T, Args>>(
  defaultOptions?: PaginateOptions
): PaginateFunction<T, Args> {
  return async (model: Model, args: Args, options: PaginateOptions): Promise<PaginatedResult<T>> => {
    const countArgs = omit(args, ['include'])
    const findManyArgs = { ...args }

    const enabled = options.page || options.perPage
    const page = Number(options.page || defaultOptions?.page) || 1
    const perPage = Number(options.perPage || defaultOptions?.perPage) || 10

    if (enabled) {
      const offset = page > 0 ? perPage * (page - 1) : 0
      findManyArgs.take = perPage
      findManyArgs.skip = offset
    }

    const [total, data] = await Promise.all([model.count(countArgs), model.findMany(findManyArgs)])

    if (!enabled) {
      return { data }
    }

    const totalPages = Math.ceil(total / perPage)

    return {
      data,
      pagination: {
        perPage: perPage,
        totalItems: total,
        totalPages: totalPages,
        currentItems: data.length,
        currentPage: page,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
      },
    }
  }
}
