import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { PartnerEntity } from 'src/domains/partner/entities/partner.entity'

/**
 * Access the user data from the request object i.e `req.currentPartner`.
 */
function userFactory(ctx: ExecutionContext): PartnerEntity {
  const contextType = ctx.getType()
  switch (contextType) {
    case 'http':
      // do something that is only important in the context of regular HTTP requests (REST)
      const { currentPartner } = ctx.switchToHttp().getRequest()
      return currentPartner

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

export const CurrentUserPartner = createParamDecorator<undefined, ExecutionContext, PartnerEntity>(
  (_, ctx: ExecutionContext) => userFactory(ctx)
)
