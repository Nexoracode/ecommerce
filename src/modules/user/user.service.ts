import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/bases/base.service';
import { UserMapper } from './mappers/user.mapper';
import { IUserCMSResponse, IUserUIResponse } from './interfaces/user.response.interface';
import { IUserService } from './interfaces/user.service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends BaseService<User> implements IUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { super(userRepo) }

    async create(data: CreateUserDto): Promise<IUserCMSResponse> {
        const existing = await this.userRepo.findOne({ where: { phone: data.phone } })
        if (existing) {
            throw new BadRequestException('user already exists with this phone number');
        }
        const addressEntities = data.addresses?.map((id) => ({ id })) ?? [];
        const user = this.userRepo.create({
            ...data,
            addresses: addressEntities,
        });
        const saved = await this.userRepo.save(user);
        return UserMapper.toCMSResponse(saved);
    }

    async update(id: number, data: UpdateUserDto): Promise<IUserCMSResponse> {
        const exists = await this.userRepo.findOne({ where: { id } })
        if (!exists) {
            throw new NotFoundException('users not found');
        }
        const addressEntities = data.addresses?.map((id) => ({ id })) ?? [];
        if (data.phone && data.phone !== exists.phone) {
            const duplicate = await this.userRepo.findOne({ where: { phone: data.phone } });
            if (duplicate) {
                throw new BadRequestException('Another user already has this phone number');
            }
        }
        const updated = this.userRepo.merge(exists, {
            ...data,
            addresses: addressEntities,
        });
        const saved = await this.userRepo.save(updated);
        return UserMapper.toCMSResponse(saved);
    }

    async remove(id: number): Promise<string> {
        const user = await this.userRepo.delete(id);
        if (user.affected === 0) {
            throw new NotFoundException('users not found');
        }
        return 'remove user successfully';
    }

    async findOneCMS(id: number): Promise<IUserCMSResponse> {
        return this.findOneWithMapper(id, [], UserMapper.toCMSResponse);
    }

    async findOneUI(id: number): Promise<IUserUIResponse> {
        return this.findOneWithMapper(id, ['addresses'], UserMapper.toUIResponse);
    }

    async findAllCMS(): Promise<IUserCMSResponse[]> {
        return this.findAllWithMapper(['addresses'], users => users.map(UserMapper.toCMSResponse));
    }


    async findAllUI(): Promise<IUserUIResponse[]> {
        return this.findAllWithMapper(['addresses'], (users) => users.map(UserMapper.toUIResponse));
    }

}
