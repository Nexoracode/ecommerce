import { Module } from '@nestjs/common';
import { VariantProductService } from './variant-product.service';
import { VariantProductController } from './variant-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantProduct } from './entities/variant-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariantProduct])],
  controllers: [VariantProductController],
  providers: [VariantProductService],
})
export class VariantProductModule { }
