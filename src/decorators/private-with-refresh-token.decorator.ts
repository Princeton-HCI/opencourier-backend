import { applyDecorators, SetMetadata } from '@nestjs/common'

export const IS_PRIVATE_WITH_REFRESH_TOKEN = 'isPrivateWithRefreshToken'

const PrivateAuthMiddleware = SetMetadata(IS_PRIVATE_WITH_REFRESH_TOKEN, true)
const PrivateAuthSwagger = SetMetadata('swagger/apiSecurity', ['isPrivateWithRefreshToken'])

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PrivateWithRefreshToken = () => applyDecorators(PrivateAuthMiddleware, PrivateAuthSwagger)
