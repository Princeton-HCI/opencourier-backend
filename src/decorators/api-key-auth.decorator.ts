import { applyDecorators, SetMetadata } from '@nestjs/common'

export const IS_API_KEY_AUTH = 'isApiKeyAuth'

const ApiKeyAuthMiddleware = SetMetadata(IS_API_KEY_AUTH, true)
const ApiKeyAuthSwagger = SetMetadata('swagger/apiSecurity', ['isApiKeyAuth'])

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ApiKeyAuth = () => applyDecorators(ApiKeyAuthMiddleware, ApiKeyAuthSwagger)
