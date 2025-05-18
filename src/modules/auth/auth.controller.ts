import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestDto } from './dto/request.dto';
import { VerifyOtpDto } from './dto/verify.dto';

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
    verifyDto(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }
}
