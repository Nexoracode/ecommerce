import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(
        private readonly galleryService: GalleryService,
    ) { }

    @Get()
    findAll() {
        return this.galleryService.findAll();
    }

    @Get('search')
    async searchByTitle(@Body('title') title: string) {
        return this.galleryService.searchByTitle(title);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@Body('title') title: string, @UploadedFile() file: Express.Multer.File) {
        return this.galleryService.uploadImage(title, file);
    }
}
