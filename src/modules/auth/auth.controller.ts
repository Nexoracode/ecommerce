import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestDto } from './dto/request.dto';
import { VerifyOtpDto } from './dto/verify.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }
    @Post('request-otp')
    requestOtp(@Body() dto: RequestDto) {
        return this.authService.requestOtp(dto);
    }

    @Post('verify-otp')
    verifyDto(@Body() dto: VerifyOtpDto, @Res() res: Response) {
        return this.authService.verifyOtp(dto, res);
    }
}
