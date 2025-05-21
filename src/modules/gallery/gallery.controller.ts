import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FtpService } from '../service/ftp.service';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(
        private readonly galleryService: GalleryService,
    ) { }
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.galleryService.uploadImage(file);
    }
}
