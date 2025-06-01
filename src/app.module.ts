import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { FtpModule } from './common/ftp/service.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryAttributeModule } from './modules/category-attribute/category-attribute.module';
import { AttributeModule } from './modules/attributes/attribute/attribute.module';
import { AttributeValueModule } from './modules/attributes/attribute-value/attribute-value.module';
import { AttributeGroupModule } from './modules/attributes/attribute-group/attribute-group.module';
import { VariantAttributeValueModule } from './modules/attributes/variant-attribute-value/variant-attribute-value.module';


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
