import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import basicAuth from 'express-basic-auth'
import { AdminRestApiModule } from './rest-api/admin.rest-api.module'
import { CourierRestApiModule } from './rest-api/courier.rest-api.module'
import { PartnerRestApiModule } from './rest-api/partner.rest-api.module'
import { setupRedocDocs } from './redoc'

export const swaggerPath = 'api'

export const swaggerDocumentBuilder = new DocumentBuilder()
  .setTitle('OPENCOURIER-API')
  .setDescription('OpenCourier Backend API')
  .setVersion('v1')
  .addBearerAuth()

export const swaggerDocumentOptions = swaggerDocumentBuilder.build()

export const swaggerSetupOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCssUrl: '../swagger/swagger.css',
  customSiteTitle: 'OPENCOURIER-API',
}

export function setupLegacyDocs(app: INestApplication) {
  app.use(
    '/api/all/docs',
    basicAuth({
      challenge: true,
      users: { opencourier: '0p3nC0ur13r' },
    })
  )

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions)
  checkDocumentForPublic(document)

  SwaggerModule.setup('/api/all/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
  setupRedocDocs(app, '/api/docs', {
    title: 'OPENCOURIER-API',
    specUrl: '/api/all/docs-json',
  })
}

export function setupAdminDocs(app: INestApplication) {
  const baseAuth = basicAuth({
    challenge: true,
    users: { opencourier: '0p3nC0ur13r' },
  })

  app.use('/api/admin/docs', baseAuth)

  swaggerDocumentBuilder.setTitle('OPENCOURIER-API - Admin')
  swaggerDocumentBuilder.setDescription('OpenCourier Admin Backend API')

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions, {
    include: [AdminRestApiModule],
    deepScanRoutes: true,
  })
  checkDocumentForPublic(document)

  SwaggerModule.setup('/api/admin/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  setupRedocDocs(app, '/api/docs/admin', {
    title: 'OPENCOURIER-API - Admin',
    specUrl: '/api/admin/docs-json',
  })
}

export function setupCourierDocs(app: INestApplication) {
  app.use(
    '/api/courier/docs',
    basicAuth({
      challenge: true,
      users: { opencourier: '0p3nC0ur13r' },
    })
  )
  swaggerDocumentBuilder.setTitle('OPENCOURIER-API - Courier')
  swaggerDocumentBuilder.setDescription('OpenCourier Courier Backend API')

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions, {
    include: [CourierRestApiModule],
    deepScanRoutes: true,
  })
  checkDocumentForPublic(document)

  SwaggerModule.setup('/api/courier/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  setupRedocDocs(app, '/api/docs/courier', {
    title: 'OPENCOURIER-API - Courier',
    specUrl: '/api/courier/docs-json',
  })
}

export function setupPartnerDocs(app: INestApplication) {
  app.use(
    '/api/partner/docs',
    basicAuth({
      challenge: true,
      users: { opencourier: '0p3nC0ur13r' },
    })
  )
  swaggerDocumentBuilder.setTitle('OPENCOURIER-API - Partner')
  swaggerDocumentBuilder.setDescription('OpenCourier Partner Backend API')

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions, {
    include: [PartnerRestApiModule],
    deepScanRoutes: true,
  })
  checkDocumentForPublic(document)

  SwaggerModule.setup('/api/partner/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  setupRedocDocs(app, '/api/docs/partner', {
    title: 'OPENCOURIER-API - Partner',
    specUrl: '/api/partner/docs-json',
  })
}

export function checkDocumentForPublic(document: OpenAPIObject) {
  /** check if there is Public decorator for each path (action) and its method (findMany / findOne) on each controller */
  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (Array.isArray(method.security) && method.security.includes('isPublic')) {
        method.security = []
      }
    })
  })
}
