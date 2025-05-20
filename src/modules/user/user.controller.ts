import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AccessGuard } from 'src/common/guard/access.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
@Controller('user')
@UseGuards(AccessGuard, RoleGuard)
export class UserController {
    @Get('profile')
    getMe(@Req() req: Request) {
        return req.user;
    }

    @Get('dashboard')
    @Roles(Role.ADMIN)
    getDashboard(@Req() req: Request) {
        return req.user;
    }
}
