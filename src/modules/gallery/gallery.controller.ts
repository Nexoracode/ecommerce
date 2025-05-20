import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('gallery')
export class GalleryController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/gallery',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            } else {
                cb(null, true);
            }
        },
        limits: {
            fileSize: 1024 * 1024 * 5 // 5MB
        }
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            message: 'File uploaded successfully',
            filename: file.filename,
            path: '/uploads/gallery/' + file.filename
        };
    }
}
