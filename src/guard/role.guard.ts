import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflect: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflect.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!roles) {
      return true;
    } else {
      console.log(user[0].role);
      return roles.includes(user[0].role) ? true : false;
    }

    return true;
  }
}
