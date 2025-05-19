import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenStrategy } from './enum.strategy'
import { Request } from 'express';
import { UnauthorizedException } from "@nestjs/common";

export class AccessStrategy extends PassportStrategy(Strategy, TokenStrategy.ACCESS) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                if (req && req.cookies) {
                    return req.cookies.access_token;
                }
                return null;
            }]),
            secretOrKey: `${process.env.JWT_SECRET}`,
            ignoreExpiration: false,
        })
    }

    validate(payload: any): unknown {
        if (!payload) {
            throw new UnauthorizedException('token is required');
        }
        return { sub: payload.sub, phone: payload.phone, email: payload.email, role: payload.role };
    }
}