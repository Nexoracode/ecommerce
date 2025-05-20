import { AuthGuard } from "@nestjs/passport";
import { TokenStrategy } from "./enum.strategy";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";

export class RefreshGuard extends AuthGuard(TokenStrategy.REFRESH) {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw new UnauthorizedException('token is missed r');
        }
        return user;
    }
}