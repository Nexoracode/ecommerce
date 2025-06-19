import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/common/decorator/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AccessGuard } from 'src/common/guard/access.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { OwnerGuard } from 'src/common/guard/owner.guard';
import { AddressService } from '../address/address.service';
import { CustomRequest } from 'src/common/interfaces/request.interface';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { UpdateAddressDto } from '../address/dto/update-address.dto';
@ApiTags('Users')
@Controller('users')
// @UseGuards(AccessGuard, RoleGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly addressService: AddressService,
    ) { }

    //user controller
    @Get()
    @HttpCode(200)
    findAllUI() {
        return this.userService.findAllUI();
    }

    // @UseGuards(AccessGuard, RoleGuard)
    @Get('cms')
    @HttpCode(200)
    findAllCMS() {
        return this.userService.findAllCMS();
    }

    // @UseGuards(AccessGuard, OwnerGuard)
    @Get(':id')
    findOneUI(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOneUI(id);
    }

    // @Roles(Role.ADMIN)
    // @UseGuards(AccessGuard, OwnerGuard)
    @Get('cms/:id')
    findOneCMS(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOneCMS(id);
    }

    // @Roles(Role.ADMIN)
    @Post()
    @HttpCode(201)
    @ApiBody({ type: [CreateUserDto] })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'phone/email already exists' })
    create(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    // @UseGuards(AccessGuard, OwnerGuard)
    @Patch(':id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
        return this.userService.update(id, data);
    }

    // @Roles(Role.ADMIN)
    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }

    //addresses controller
    // @UseGuards(AccessGuard)
    @Get('me/addresses')
    findMeAddress(@Req() req: CustomRequest) {
        return this.addressService.findByUserId(req.user.sub);
    }

    // @UseGuards(AccessGuard)
    @Post('me/addresses')
    createAddressForUser(@Req() req: CustomRequest, @Body() data: CreateAddressDto) {
        return this.addressService.create(req.user.sub, data);
    }

    // @Roles(Role.ADMIN)
    @Post(':id/addresses')
    createAddressForAdmin(@Param('id', ParseIntPipe) id: number, @Body() data: CreateAddressDto) {
        return this.addressService.create(id, data);
    }

    // @UseGuards(AccessGuard)
    @Patch('me/addresses/:addressId')
    updateUserAddress(@Param('addressId', ParseIntPipe) addressId: number, @Body() data: UpdateAddressDto) {
        return this.addressService.update(addressId, data);
    }

    // @UseGuards(AccessGuard)
    @Delete('me/addresses/:addressId')
    deleteUserAddress(@Param('addressId', ParseIntPipe) addressId: number) {
        return this.addressService.remove(addressId);
    }

}
