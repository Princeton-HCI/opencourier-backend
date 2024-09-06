import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import fs from 'fs'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { AppModule } from '../src/app.module'
import { ApiException } from '../src/errors'
// import { AdminRestApiModule } from '../src/rest-api/admin.rest-api.module'
import { CourierRestApiModule } from 'src/rest-api/courier.rest-api.module'
import { swaggerDocumentBuilder } from '../src/swagger'

if (require.main === module) {
  generateSdk().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

async function generateSdk() {
  const app = await NestFactory.create(AppModule)
  if (!fs.existsSync('./client-sdk')) {
    fs.mkdirSync('./client-sdk', { recursive: true })
  }

  app.setGlobalPrefix('v1', { exclude: ['v0(.*)', '(.*)/v1/(.*)'] })

  // await generateAdminSdk(app) // TODO: Add admin.
  await generateCourierSdk(app)

  await app.close()
}

// export async function generateAdminSdk(app: INestApplication) {
//   await OpenApiNestFactory.configure(
//     app,
//     swaggerDocumentBuilder,
//     {
//       fileGeneratorOptions: {
//         enabled: true,
//         outputFilePath: './client-sdk/openapi-admin.yaml',
//       },
//       clientGeneratorOptions: {
//         enabled: true,
//         type: 'typescript-fetch',
//         outputFolderPath: '../../packages/backend-admin-sdk/src',
//         additionalProperties: ['prefixParameterInterfaces=true', 'modelPropertyNaming=original'].join(','),
//         openApiFilePath: './client-sdk/openapi-admin.yaml',
//         skipValidation: true,
//       },
//     },
//     {
//       include: [AdminRestApiModule],
//       extraModels: [ApiException],
//       deepScanRoutes: true,
//       operationIdFactory: (_, methodKey) => methodKey,
//     }
//   )
// }

export async function generateCourierSdk(app: INestApplication) {
  await OpenApiNestFactory.configure(
    app,
    swaggerDocumentBuilder,
    {
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './client-sdk/openapi-courier.yaml',
      },
      clientGeneratorOptions: {
        enabled: true,
        type: 'typescript-fetch',
        outputFolderPath: '../../packages/backend-courier-sdk/src',
        additionalProperties: ['prefixParameterInterfaces=true', 'modelPropertyNaming=original'].join(','),
        openApiFilePath: './client-sdk/openapi-courier.yaml',
        skipValidation: true,
      },
    },
    {
      include: [CourierRestApiModule],
      extraModels: [ApiException],
      deepScanRoutes: true,
      operationIdFactory: (_, methodKey) => methodKey,
    }
  )
}
