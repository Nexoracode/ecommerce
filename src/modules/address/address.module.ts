import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  providers: [AddressService],
  exports: [AddressService]
})
export class AddressModule { }
