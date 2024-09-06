import { INestApplication } from '@nestjs/common'
import redoc from 'redoc-express'
import { Ioption } from 'redoc-express/dist/redoc-html-template'

export function setupRedocDocs(app: INestApplication, url: string, options: Ioption) {
  const redocOptions = {
    version: '1.1',
    ...options,
  }

  app.use(url, redoc(redocOptions))
}
