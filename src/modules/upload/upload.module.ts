import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [UploadService],
    exports: [UploadService],
})
export class UploadModule { }
