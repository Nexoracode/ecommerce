import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/guard/access.guard';
import { Request } from 'express';
@Controller('user')
export class UserController {
    @UseGuards(AccessGuard)
    @Get('profile')
    getMe(@Req() req: Request) {
        return req.user;
    }
}
