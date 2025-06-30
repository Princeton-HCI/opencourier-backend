import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ParsedQs } from 'qs'

@Injectable()
export class QueryMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { orderBy, ...filteredQuery } = req.query
    req.query = filteredQuery

    for (const key of Object.keys(filteredQuery)) {
      req.query = {
        ...req.query,
        [key]: this.parseValue(filteredQuery[key] as string | string[] | ParsedQs | ParsedQs[] | undefined),
      }
    }

    if (typeof orderBy === 'string') {
      const orderByItems = this.tryParse(decodeURIComponent(orderBy).split('=')[1] ?? '')
      req.query = {
        ...req.query,
        orderBy: orderByItems,
      }
    }

    next()
  }

  private parseValue(value: undefined | string | string[] | ParsedQs | ParsedQs[] | null): any {
    if (typeof value === 'string') {
      return this.tryParse(value)
    }

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return value.map((item: string | ParsedQs) => this.parseValue(item))
      }
      return this.parseValue(value)
    }

    return value
  }

  private tryParse(value: string): any {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
}
