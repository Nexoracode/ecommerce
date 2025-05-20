import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryController } from './modules/gallery/gallery.controller';
import { GalleryService } from './modules/gallery/gallery.service';

@Module({
  imports: [AppConfigModule, UserModule, AddressModule, AuthModule],
  controllers: [AppController, GalleryController],
  providers: [AppService, GalleryService],
})
export class AppModule { }
