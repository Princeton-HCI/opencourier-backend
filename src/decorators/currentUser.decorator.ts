import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from '../domains/user/entities/user.entity'

/**
 * Access the user data from the request object i.e `req.user`.
 */
function userFactory(ctx: ExecutionContext): UserEntity {
  const contextType = ctx.getType()
  switch (contextType) {
    case 'http':
      // do something that is only important in the context of regular HTTP requests (REST)
      const { currentUser } = ctx.switchToHttp().getRequest()
      return currentUser

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

export const CurrentUser = createParamDecorator<undefined, ExecutionContext, UserEntity>((_, ctx: ExecutionContext) =>
  userFactory(ctx)
)
