import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { EnumUserRole } from '@prisma/types'
import { UserEntity } from '../domains/user/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EnumUserRole[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const { currentUser } = context.switchToHttp().getRequest()

    if (!(currentUser instanceof UserEntity)) {
      return false
    }

    return Boolean(requiredRoles.filter((role) => currentUser.role.includes(role)).length)
  }
}
