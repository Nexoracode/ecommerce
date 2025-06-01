import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { IGalleryResponse } from './interfaces/gallery.interface';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('gallery')
export class GalleryController {
    constructor(
        private readonly galleryService: GalleryService,
    ) { }

    @Post()
    create(@Body() createGalleryDto: CreateGalleryDto): Promise<IGalleryResponse> {
        return this.galleryService.create(createGalleryDto);
    }

    @Get()
    findAll(): Promise<IGalleryResponse[]> {
        return this.galleryService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateGalleryDto: UpdateGalleryDto
    ): Promise<IGalleryResponse> {
        return this.galleryService.update(id, updateGalleryDto)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() file: Express.Multer.File, @Body() data: CreateGalleryDto):
        Promise<IGalleryResponse> {
        return this.galleryService.uploadImage(file, data);
    }
}
