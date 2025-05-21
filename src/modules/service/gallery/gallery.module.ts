import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { FtpService } from '../ftp/ftp.service';
import { GalleryService } from './gallery.service';

@Module({
    controllers: [GalleryController],
    providers: [FtpService, GalleryService]
})
export class GalleryModule { }
