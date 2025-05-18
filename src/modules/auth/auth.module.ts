import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtUtil } from 'src/utils/jwt.util';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, JwtService, JwtUtil],
  controllers: [AuthController]
})
export class AuthModule { }
