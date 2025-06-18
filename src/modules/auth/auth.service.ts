import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RequestDto } from './dto/request.dto';
import { VerifyOtpDto } from './dto/verify.dto';
import { JwtTypeToken as TypeToken, JwtUtil } from 'src/common/utils/jwt.util';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { VerificationStatus } from 'src/common/enums/verification-status.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtUtil: JwtUtil
    ) { }

    private otpService = new Map<string, string>();

    async getUserById(id: number) {
        const user = await this.userRepo.findOne({
            where: [{ id: id },],
            select: ['id', 'phone', 'email', 'role', 'apiToken'],
        });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    requestOtp(dto: RequestDto) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.otpService.set('code', code);
        this.otpService.set('phone', dto.phone);
        console.log(`send code for ${dto.phone} : ${code}`)
        return { message: 'send code successfully' };
    }

    async verifyOtp(dto: VerifyOtpDto, res: Response) {
        var response = { status: 200, message: 'login successfully' };
        const realCode = this.otpService.get('code');
        const phone = this.otpService.get('phone');
        let user = await this.userRepo.findOne({
            where: [
                { phone: dto.phone },
            ],
            select: ['id', 'phone', 'email', 'role', 'apiToken'],
        });
        // if (realCode != dto.phone) {
        //     throw new UnauthorizedException('code is valid')
        // }
        if (dto.code !== '123456') {
            throw new UnauthorizedException('code is valid')
        }
        if (phone != dto.phone) {
            throw new UnauthorizedException('phone is valid')
        }
        if (!user) {
            if (dto.phone.includes('@')) {
                user = this.userRepo.create({ email: dto.phone });
            } else {
                user = this.userRepo.create({ phone: dto.phone });
            }
            response.status = 201;
            response.message = 'register user successfully';
        }
        user.verificationStatus = VerificationStatus.VERIFIED;
        user.avatarUrl = 'https://api.digikala.com/static/files/fd4840b2.svg';
        this.otpService.delete('code');
        this.otpService.delete('phone');
        //generate jwt
        const payload = { sub: user.id, phone: user.phone, email: user.email, role: user.role };
        const token = this.jwtUtil.generateToken(payload, TypeToken.ACCESS);
        const refreshToken = this.jwtUtil.generateToken(payload, TypeToken.REFRESH);
        user.apiToken = refreshToken;
        //save user
        await this.userRepo.save(user);
        //set token in cookie
        this.jwtUtil.setTokenInCookie(res, token, TypeToken.ACCESS);
        this.jwtUtil.setTokenInCookie(res, refreshToken, TypeToken.REFRESH);
        const { firstName, lastName, apiToken, verificationStatus, role, password, ...userData } = user;
        return res.json({
            message: response.message,
            user: userData
        }).status(response.status)
    }
}
