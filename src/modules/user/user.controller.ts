import { Controller, Get } from '@nestjs/common';
@Controller('user')
export class UserController {
    @Get('profile')
    getMe() {
        return 'user';
    }
}
