import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class ResponseFormatMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ResponseFormatMiddleware.name)

  use(req: Request, res: Response, next: () => void) {
    const originalJson = res.json.bind(res) // Bind the original response method to `res`
    res.json = (body) => {
      const data = body ? body : {} // Use an empty object if no response body is provided

      //TODO: implement human readable errors in message in production, developer readable messages in dev.
      if (res.statusCode >= 400) {
        const newResponse = {
          error: true,
          result: [
            {
              code: data.code ?? 'ERROR',
              message: data.message,
              statusCode: res.statusCode,
            },
          ],
        }
        return originalJson(newResponse) // Call the original response method with the new format
      } else {
        const newResponse = { error: false, result: data }
        return originalJson(newResponse) // Call the original response method with the new format
      }
    }
    next()
  }
}
