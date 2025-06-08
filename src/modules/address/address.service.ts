import { BadRequestException, Injectable } from '@nestjs/common';
import { IAddressService } from './interfaces/address.service.interface';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IAddressResponse } from './interfaces/address.response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { AddressMapper } from './mappers/address.mapper';

@Injectable()
export class AddressService implements IAddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepo: Repository<Address>
    ) { }
    async create(data: CreateAddressDto): Promise<IAddressResponse> {
        const exists = await this.addressRepo.findOne({
            where: { postalCode: data.postalCode },
            relations: ['users']
        })
        if (exists) {
            throw new BadRequestException('postal code already exists');
        }
        const address = this.addressRepo.create(data);
        const saved = await this.addressRepo.save(address);
        return AddressMapper.toResponse(saved);
    }
    async update(id: number, data: UpdateAddressDto): Promise<IAddressResponse> {
        throw new Error('Method not implemented.');
    }
    async remove(id: number): Promise<string> {
        throw new Error('Method not implemented.');
    }
    async findByUserId(userId: number): Promise<IAddressResponse> {
        throw new Error('Method not implemented.');
    }
    async findOne(id: number): Promise<IAddressResponse> {
        throw new Error('Method not implemented.');
    }

}
