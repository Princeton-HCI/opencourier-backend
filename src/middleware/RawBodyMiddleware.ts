import { Response } from 'express'
import { json } from 'body-parser'

import { Request } from 'express'

export interface RequestWithRawBody extends Request {
  rawBody: Buffer
}

function rawBodyMiddleware() {
  return json({
    verify: (request: RequestWithRawBody, response: Response, buffer: Buffer) => {
      if (request.url === '/stripe/webhooks' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer)
      }
      return true
    },
  })
}

export default rawBodyMiddleware
