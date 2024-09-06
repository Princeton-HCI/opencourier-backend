import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

export const NestedQuery = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const typeOfInstance = Reflect.getOwnMetadata('type__nested_query', ctx.getHandler())
    const request = ctx.switchToHttp().getRequest()
    return plainToInstance(typeOfInstance, request.query)
  },
  [
    (target, propertyKey, parameterIndex): void => {
      const paramTypes = Reflect.getOwnMetadata('design:paramtypes', target, propertyKey!)
      if (paramTypes) {
        Reflect.defineMetadata('type__nested_query', paramTypes[parameterIndex], (target as any)[propertyKey!])
      }
    },
  ]
)
