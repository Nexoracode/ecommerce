import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export enum JwtTypeToken {
    ACCESS = 'access_token',
    REFRESH = 'refresh_token',
}

@Injectable()
export class JwtUtil {
    constructor(
        private jwtService: JwtService,
    ) { }

    generateToken(payload: any, type: JwtTypeToken) {
        const token = this.jwtService.sign(payload, {
            secret: type === JwtTypeToken.ACCESS ? process.env.JWT_SECRET : process.env.JWT_REFRESH_SECRET,
            expiresIn: type === JwtTypeToken.ACCESS ? process.env.JWT_EXPIRATION : process.env.JWT_REFRESH_EXPIRATION,
        });
        return token;
    }

    verifyToken(token: string, type: JwtTypeToken) {
        try {
            const secret = type === JwtTypeToken.ACCESS ? process.env.JWT_SECRET : process.env.JWT_REFRESH_SECRET;
            return this.jwtService.verify(token, { secret });
        } catch (error) {
            return null;
        }
    }

    decodeToken(token: string) {
        try {
            return this.jwtService.decode(token);
        } catch (error) {
            return null;
        }
    }
}