import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

@Injectable()
export class NgrokMiddleware implements NestMiddleware {
  private readonly logger = new Logger(NgrokMiddleware.name)

  private url: string

  constructor() {
    // Retrieve the URL endpoint from the .env file or replace it directly here
    this.url = process.env.NGROK_URL || ''
    if (!this.url) {
      this.logger.log("Ngrok URL not specified, forwarding won't happen")
    } else {
      this.logger.log(`Ngrok forwarding ${this.url}`)
    }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.url) {
      return next()
    }

    //make sure host is the development server or else this will endlessly loop
    if (req.method === 'POST' && req.headers.host == 'api.dev.palettelabs.io') {
      this.logger.log(`Destination ${req.headers.host}${req.path}`)
      this.logger.log(`Headers ${JSON.stringify(req.headers)}`)
      this.logger.log(`Body ${JSON.stringify(req.body)}`)
      this.logger.log(`Forwarding to ${this.url}${req.path}`)
      try {
        const headers = {
          token: req.headers.token,
        }

        await axios.post(`${this.url}${req.path}`, req.body, {
          headers: headers,
        })
      } catch (error) {
        this.logger.log(`Error forwarding ngrok ${(error as any).message || error}`, error)
      }
      next()
    } else {
      next()
    }
  }
}
