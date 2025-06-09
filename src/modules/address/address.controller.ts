import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AccessGuard } from 'src/common/guard/access.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { OwnerGuard } from 'src/common/guard/owner.guard';

@UseGuards(AccessGuard, OwnerGuard)
@Controller('addresses')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) { }

    @Post()
    create(@Body() data: CreateAddressDto) {
        return this.addressService.create(data);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateAddressDto) {
        return this.addressService.update(id, data);
    }

    @Get('user/:userId')
    findByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.addressService.findByUserId(userId);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.remove(id);
    }
}
