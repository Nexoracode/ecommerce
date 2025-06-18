import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/bases/base.service';
import { UserMapper } from './mappers/user.mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNameNationalCodeUserDto } from './dto/update-name-national-code.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async updateNameNationalCode(userId: number, data: UpdateNameNationalCodeUserDto) {
        const exists = await this.userRepo.findOne({ where: { id: userId } });
        if (!exists) throw new NotFoundException('کاربر مورد نظر، وجود ندارد');
        const updated = this.userRepo.merge(exists, { ...data });
        const saved = await this.userRepo.save(updated)
        return saved;
    }
}
