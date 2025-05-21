import { Module } from '@nestjs/common';
import { FtpService } from './ftp.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [FtpService],
    exports: [FtpService],
})
export class FtpModule { }
