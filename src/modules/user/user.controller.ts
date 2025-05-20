import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
@Controller('user')
export class UserController {
    @Get('profile')
    getMe(@Req() req: Request) {
        return req.user;
    }
}
