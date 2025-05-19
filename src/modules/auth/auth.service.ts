import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RequestDto } from './dto/request.dto';
import { VerifyOtpDto } from './dto/verify.dto';
import { JwtTypeToken as TypeToken, JwtUtil } from 'src/utils/jwt.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtUtil: JwtUtil
    ) { }

    private otpService = new Map<string, string>();

    requestOtp(dto: RequestDto) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.otpService.set(dto.phone, code);
        console.log(`code for ${dto.phone} number : ${code}`);
        return { message: 'send code successfully' };
    }

    async verifyOtp(dto: VerifyOtpDto) {
        const code = this.otpService.get(dto.phone); // دریافت کد از مپ
        if (code != dto.code) {
            throw new UnauthorizedException('code is not valid');
        }
        let user = await this.userRepo.findOne({ where: { phone: dto.phone }, select: ['id', 'phone', 'apiToken', 'role'] });
        if (!user) {
            user = this.userRepo.create({ phone: dto.phone });
        } else {
            user.isPhoneVerified = true;
        }
        this.otpService.delete(dto.phone);

        //generate jwt
        const payload = { sub: user.id, phone: user.phone, role: user.role };
        const token = this.jwtUtil.generateToken(payload, TypeToken.ACCESS);
        //hash token
        const hashToken = await bcrypt.hash(token, 10);
        user.apiToken = hashToken;
        //save user
        await this.userRepo.save(user);
        const { firstName, lastName, apiToken, isPhoneVerified, role, password, ...userData } = user;
        return {
            message: 'successfully',
            statusCode: '200',
            data: {
                user: userData,
                api_token: hashToken,
            }
        }
    }
}
