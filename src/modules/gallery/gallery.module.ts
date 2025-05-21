import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entity/gallery.entity';
import { FtpService } from 'src/common/ftp/ftp.service';
import { FtpModule } from 'src/common/ftp/service.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Gallery]),
        FtpModule,
    ],
    controllers: [GalleryController],
    providers: [GalleryService],
    exports: [GalleryService]
})
export class GalleryModule { }
