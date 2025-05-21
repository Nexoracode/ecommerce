import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { Readable } from 'typeorm/platform/PlatformTools';
@Injectable()
export class FtpService {
    private client: ftp.Client;

    constructor() {
        this.client = new ftp.Client();
        this.client.ftp.verbose = false;
    }

    async uploadFile(
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
}
