import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryController } from './modules/gallery/gallery.controller';
import { GalleryService } from './modules/gallery/gallery.service';
import { FtpController } from './modules/service/ftp.controller';
import { FtpService } from './modules/service/ftp.service';
import { ServiceModule } from './modules/service/service.module';
import { GalleryModule } from './modules/gallery/gallery.module';

@Module({
  imports: [AppConfigModule, UserModule, AddressModule, AuthModule, ServiceModule, GalleryModule],
  controllers: [AppController, GalleryController, FtpController],
  providers: [AppService, GalleryService, FtpService],
})
export class AppModule { }
