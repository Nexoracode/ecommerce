import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Like, Repository } from 'typeorm';
import { FtpService } from 'src/common/ftp/ftp.service';
import { IGalleryService } from './interfaces/gallery.service.interface';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { IGalleryResponse } from './interfaces/gallery.interface';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService implements IGalleryService {
    constructor(
        @InjectRepository(Gallery)
        private galleryRepo: Repository<Gallery>,
        private readonly ftpService: FtpService,
    ) { }

    private toResponse(gallery: Gallery): IGalleryResponse {
        const { isActive, ...response } = gallery;
        return response;
    }

    async create(data: CreateGalleryDto): Promise<IGalleryResponse> {
        const gallery = this.galleryRepo.create(data);
        await this.galleryRepo.save(gallery);
        return this.toResponse(gallery);
    }

    async findAll(): Promise<IGalleryResponse[]> {
        const galleries = await this.galleryRepo.find({
            where: { isActive: true },
            order: { order: 'ASC', createdAt: 'DESC' },
        });
        return galleries.map(this.toResponse);
    }

    async findOne(id: number): Promise<IGalleryResponse> {
        const gallery = await this.galleryRepo.findOne({
            where: { id, isActive: true },
        });
        if (!gallery) {
            throw new NotFoundException(`Gallery with ID ${id} not found`);
        }
        return this.toResponse(gallery);
    }

    async remove(id: number): Promise<void> {
        const result = await this.galleryRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Gallery with ID ${id} not found`);
        }
    }

    async update(id: number, data: UpdateGalleryDto): Promise<IGalleryResponse> {
        await this.galleryRepo.update(id, data);
        const gallery = await this.findOne(id);
        return this.toResponse({ isActive: true, ...gallery });
    }

    async uploadImage(file: Express.Multer.File, data: CreateGalleryDto): Promise<IGalleryResponse> {
        console.log('upload start');
        if (!file) throw new BadRequestException('No file provided');
        const ext = file.originalname.split('.').pop();
        const filename = `img-${Date.now()}.${ext}`;
        const url = await this.ftpService.uploadFile(file.buffer, 'gallery', filename);
        if (!url || typeof url !== 'string') {
            throw new BadRequestException('Failed to upload image');
        }
        const gallery = await this.create({
            ...data,
            imageUrl: url,
        });
        return this.toResponse({ isActive: true, ...gallery });
    }
}
