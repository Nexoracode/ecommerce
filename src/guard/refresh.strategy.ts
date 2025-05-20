import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenStrategy } from "./enum.strategy";
import { Request } from 'express';
import { UnauthorizedException } from "@nestjs/common";

export class RefreshStrategy extends PassportStrategy(Strategy, TokenStrategy.REFRESH) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                if (req && req.cookies) {
                    return req.cookies.refresh_token;
                }
                return null;
            }]),
            secretOrKey: `${process.env.JWT_REFRESH_SECRET}`,
            ignoreExpiration: false,
        })
    }

    validate(payload: any) {
        if (!payload) {
            throw new UnauthorizedException('token is valid r');
        }
        return { sub: payload.sub, phone: payload.phone, email: payload.email, role: payload.role }
    }
}