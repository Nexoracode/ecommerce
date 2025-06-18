import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AccessGuard } from 'src/common/guard/access.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OwnerGuard } from 'src/common/guard/owner.guard';
import { AddressService } from '../address/address.service';
import { CustomRequest } from 'src/common/interfaces/request.interface';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { UpdateAddressDto } from '../address/dto/update-address.dto';
import { UpdateNameNationalCodeUserDto } from './dto/update-name-national-code.dto';
@ApiTags('Users')
@Controller('users')
// @UseGuards(AccessGuard, RoleGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly addressService: AddressService,
    ) { }

    @Post('profile/name-national-code/update')
    updateName(@Req() req: CustomRequest, data: UpdateNameNationalCodeUserDto) {
        return this.userService.updateNameNationalCode(req.user.sub, data);
    }

}
