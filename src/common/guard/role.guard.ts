import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorator/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles || requiredRoles.length === 0) return true;
        const { user } = context.switchToHttp().getRequest();
        if (!user) throw new ForbiddenException('No user found in request');
        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('access denied based on role');
        }
        return true;
    }

}