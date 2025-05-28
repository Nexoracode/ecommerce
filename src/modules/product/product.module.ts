import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductVariant } from './entity/product-variant.entity';
import { CategoryModule } from '../category/category.module';
import { ProductVariantService } from './product-variant.service';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';
import { VariantAttributeValueModule } from '../variant-attribute-value/variant-attribute-value.module';

@Module({
  imports: [
    CategoryModule,
    VariantAttributeValueModule,
    TypeOrmModule.forFeature([
      Product,
      ProductVariant,
    ]),
  ],
  providers: [ProductService, ProductVariantService],
  controllers: [ProductController]
})
export class ProductModule { }
