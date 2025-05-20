import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { RequestDto } from './dto/request.dto';
import { VerifyOtpDto } from './dto/verify.dto';
import { JwtTypeToken, JwtUtil } from 'src/utils/jwt.util';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtUtil: JwtUtil
    ) { }

    private otpService = new Map<string, string>(); // ذخیره موقت

    requestOtp(dto: RequestDto) {
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // تولید کد 6 رقمی
        this.otpService.set(dto.phone, code); // ذخیره کد در مپ
        console.log(`کد تایید برای شماره ${dto.phone} : ${code}`); // نمایش کد در کنسول
        return { message: 'کد تایید ارسال شد' };
    }

    async verifyOtp(dto: VerifyOtpDto) {
        const code = this.otpService.get(dto.phone); // دریافت کد از مپ
        if (code != dto.code) {
            throw new UnauthorizedException('کد تایید نادرست است');
        }
        let user = await this.userRepo.findOne({ where: { phone: dto.phone } });
        if (!user) {
            user = this.userRepo.create({ phone: dto.phone });
        } else {
            user.isPhoneVerified = true;
        }
        await this.userRepo.save(user); // ذخیره کاربر در دیتابیس
        this.otpService.delete(dto.phone); // حذف کد از مپ

        //generate jwt
        const payload = { sub: user.id, phone: user.phone, role: user.role };
        const token = this.jwtUtil.generateToken(payload, JwtTypeToken.ACCESS);
        const userWithoutPassword = { ...user };
        return {
            access_token: token,
            user: userWithoutPassword,
        }
    }
}
