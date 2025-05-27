import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { FtpModule } from './common/ftp/service.module';
import { GalleryController } from './modules/gallery/gallery.controller';
import { GalleryService } from './modules/gallery/gallery.service';
import { FtpService } from './common/ftp/ftp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryAttributeModule } from './modules/category-attribute/category-attribute.module';
import { AttributeModule } from './modules/attribute/attribute.module';
import { AttributeValueModule } from './modules/attribute-value/attribute-value.module';
import { AttributeGroupModule } from './modules/attribute-group/attribute-group.module';
import { VariantAttributeValueModule } from './modules/variant-attribute-value/variant-attribute-value.module';


@Module({
  imports: [
    AppConfigModule,
    GalleryModule,
    UserModule,
    AddressModule,
    AuthModule,
    FtpModule,
    CategoryModule,
    ProductModule,
    CategoryAttributeModule,
    AttributeModule,
    AttributeValueModule,
    AttributeGroupModule,
    VariantAttributeValueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
