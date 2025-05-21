import { BadRequestException, Injectable } from '@nestjs/common';
import { FtpService } from '../ftp/ftp.service';

@Injectable()
export class GalleryService {
    constructor(
        private readonly ftpService: FtpService,
    ) { }

    async uploadImage(file: Express.Multer.File) {
        if (!file) throw new BadRequestException('No file provided');
        const ext = file.originalname.split('.').pop();
        const filename = `img-${Date.now()}.${ext}`;

        const url = await this.ftpService.uploadFile(file.buffer, 'gallery', filename);
        return {
            message: 'File uploaded successfully',
            url,
        };
    }
}
