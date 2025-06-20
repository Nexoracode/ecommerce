import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { VariantAttributeValueModule } from '../attributes/variant-attribute-value/variant-attribute-value.module';

@Module({
  imports: [
    CategoryModule,
    VariantAttributeValueModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
