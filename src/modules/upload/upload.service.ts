import { BadRequestException, Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { Readable } from 'typeorm/platform/PlatformTools';
@Injectable()
export class UploadService {
    private client: ftp.Client;

    constructor() {
        this.client = new ftp.Client();
        this.client.ftp.verbose = false;
    }

    async uploadFileToServer(
        buffer: Buffer,
        remotePath: string,
        filename: string,
    ): Promise<string> {
        try {
            await this.client.access({
                host: `ftp.${process.env.FTP_HOST}`,
                user: process.env.FTP_USERNAME,
                password: process.env.FTP_PASSWORD,
                secure: false,
            });

            await this.client.ensureDir(remotePath);
            await this.client.uploadFrom(Readable.from(buffer), filename);
            this.client.close();

            return `https://dl.${process.env.FTP_HOST}/${remotePath}/${filename}`;
        } catch (error) {
            console.error('FTP upload error:', error);
            throw error;
        }
    }

    async uploadFile(files: Express.Multer.File[]) {
        if (!files || files.length === 0) throw new BadRequestException('no files provided');
        const uploadedUrls: string[] = [];

        for (const file of files) {
            const ext = file.originalname.split('.').pop();
            const filename = `img-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
            const url = await this.uploadFileToServer(file.buffer, 'gallery', filename);
            if (!url || typeof url !== 'string') {
                throw new BadRequestException(`Failed to upload image : ${file.originalname}`)
            }
            uploadedUrls.push(url);
        }

        return {
            message: 'آپلود تصاویر با موفقیت انجام شد',
            data: uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls,
        }
    }
}
