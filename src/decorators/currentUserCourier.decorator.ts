import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { CourierEntity } from 'src/domains/courier/entities/courier.entity'

/**
 * Access the user data from the request object i.e `req.user`.
 */
function userFactory(ctx: ExecutionContext): CourierEntity {
  const contextType = ctx.getType()
  switch (contextType) {
    case 'http':
      // do something that is only important in the context of regular HTTP requests (REST)
      const { currentCourier } = ctx.switchToHttp().getRequest()
      return currentCourier

    case 'rpc':
      // do something that is only important in the context of Microservice requests
      throw new Error('Rpc context is not implemented yet')

    case 'ws':
      // do something that is only important in the context of Websockets requests
      throw new Error('Websockets context is not implemented yet')

    default:
      throw new Error('Invalid context')
  }
}

export const CurrentUserCourier = createParamDecorator<undefined, ExecutionContext, CourierEntity>((_, ctx: ExecutionContext) =>
  userFactory(ctx)
)
