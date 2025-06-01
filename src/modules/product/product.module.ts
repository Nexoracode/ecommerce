import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { CategoryModule } from '../category/category.module';
import { ProductVariantService } from './product-variant.service';
import { VariantAttributeValueModule } from '../attributes/variant-attribute-value/variant-attribute-value.module';

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
