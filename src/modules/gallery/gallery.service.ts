import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entites/gallery.entity';
import { Like, Repository } from 'typeorm';
import { FtpService } from 'src/common/ftp/ftp.service';

@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(Gallery)
        private galleryRepo: Repository<Gallery>,
        private readonly ftpService: FtpService,
    ) { }

    async #saveImage(title: string, url: string) {
        let image = await this.galleryRepo.findOne({ where: { url } });
        if (image) {
            throw new BadRequestException('url exists');
        }
        image = this.galleryRepo.create({ title, url });
        await this.galleryRepo.save(image);
    }

    async uploadImage(title: string, file: Express.Multer.File) {
        if (!file) throw new BadRequestException('No file provided');
        const ext = file.originalname.split('.').pop();
        const filename = `img-${Date.now()}.${ext}`;

        const url = await this.ftpService.uploadFile(file.buffer, 'gallery', filename);
        this.#saveImage(title, url);
        return {
            message: 'File uploaded successfully',
            data: {
                title,
                url,
            }
        };
    }

    async findAll() {
        const gallery = await this.galleryRepo.find();
        return gallery;
    }

    async searchByTitle(title: string) {
        if (!title) {
            throw new BadRequestException('Title is required for search');
        }
        const gallery = await this.galleryRepo.find({
            where: { title: Like(`%${title}%`) },
        });
        if (gallery.length === 0) {
            throw new BadRequestException('No images found with the given title');
        }
        return gallery;
    }
}
