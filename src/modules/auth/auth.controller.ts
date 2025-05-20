import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestDto } from './dto/request.dto';
import { VerifyOtpDto } from './dto/verify.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorator/public.decorator';
import { AccessGuard } from 'src/common/guard/access.guard';
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }
    @Post('request-otp')
    @Public()
    requestOtp(@Body() dto: RequestDto) {
        return this.authService.requestOtp(dto);
    }

    @Post('verify-otp')
    @UseGuards(AccessGuard)
    verifyDto(@Body() dto: VerifyOtpDto, @Res() res: Response) {
        return this.authService.verifyOtp(dto, res);
    }
}
