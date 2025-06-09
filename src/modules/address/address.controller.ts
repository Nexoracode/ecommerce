import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AccessGuard } from 'src/common/guard/access.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { OwnerGuard } from 'src/common/guard/owner.guard';
import { CustomRequest } from 'src/common/interfaces/request.interface';

@UseGuards(AccessGuard, RoleGuard)
@Controller('addresses')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) { }

    @UseGuards(AccessGuard)
    @Get('me')
    findMe(@Req() req: CustomRequest) {
        return this.addressService.findMe(req);
    }

    @UseGuards(AccessGuard)
    @Post()
    create(@Body() data: CreateAddressDto) {
        return this.addressService.create(data);
    }

    @UseGuards(AccessGuard, OwnerGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateAddressDto) {
        return this.addressService.update(id, data);
    }

    @UseGuards(AccessGuard, OwnerGuard)
    @Get('user/:userId')
    findByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.addressService.findByUserId(userId);
    }

    @UseGuards(AccessGuard, OwnerGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.remove(id);
    }
}
