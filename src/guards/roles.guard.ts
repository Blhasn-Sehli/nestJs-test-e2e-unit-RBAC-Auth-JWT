
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorater';
import { Role } from 'src/enums/role.enum';

//Role Guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    //get the user object from the request object
    const { user } = context.switchToHttp().getRequest();
    //check if the user has the required roles if the user has the required roles, return true else return false
    return requiredRoles.some((role) => user.role === role);
  }
}
