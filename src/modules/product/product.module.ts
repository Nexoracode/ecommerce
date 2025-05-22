import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Attribute } from './entity/attribute.entity';
import { AttributeValue } from './entity/attribute-value.entity';
import { ProductVariant } from './entity/product-variant.entity';
import { AttributeService } from './attribute.service';
import { AttributeValueService } from './attribute-value.service';
import { CategoryModule } from '../category/category.module';
import { ProductVariantService } from './product-variant.service';
import { CategoryAttributeService } from './category-attribute.service';
import { CategoryAttribute } from './entity/category-attribute.entity';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forFeature([
      Product,
      Attribute,
      CategoryAttribute,
      AttributeValue,
      ProductVariant,
    ]),
  ],
  providers: [ProductService, AttributeService, AttributeValueService, ProductVariantService, CategoryAttributeService],
  controllers: [ProductController]
})
export class ProductModule { }
