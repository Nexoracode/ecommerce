import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(
        private readonly galleryService: GalleryService,
    ) { }
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@Body('title') title: string, @UploadedFile() file: Express.Multer.File) {
        return this.galleryService.uploadImage(title, file);
    }
}
