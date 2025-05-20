import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/modules/auth/auth.service";
import { Request, Response } from "express";
import { JwtTypeToken, JwtUtil } from "src/utils/jwt.util";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutoRefreshGuard implements CanActivate {
    constructor(
        private readonly tokenService: JwtUtil,
        private readonly authService: AuthService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();

        //check if the route is public
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) return true;

        const accessToken = req.cookies['access_token'];
        const refreshToken = req.cookies['refresh_token'];

        if (!accessToken && !refreshToken) return false;
        try {
            this.tokenService.verifyToken(accessToken, JwtTypeToken.ACCESS);
            return true;
        } catch (error) {
            if (!refreshToken) throw new UnauthorizedException('refresh token not found');
            try {
                const decode = this.tokenService.verifyToken(refreshToken, JwtTypeToken.REFRESH);
                const user = await this.authService.getUserById(decode.sub);
                const isMatch = await bcrypt.compare(refreshToken, user.apiToken);
                if (!isMatch) throw new UnauthorizedException('refresh token not match');

                const payload = {
                    sub: user.id,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }

                const newAccessToken = this.tokenService.generateToken(payload, JwtTypeToken.ACCESS);
                this.tokenService.setTokenInCookie(res, newAccessToken, JwtTypeToken.ACCESS);

                //update request object for future access
                req.cookies['access_token'] = newAccessToken;
                res.locals['newAccessToken'] = newAccessToken;
                return true;

            } catch (error) {
                throw new UnauthorizedException('refresh token is invalid');
            }
        }
    }
}