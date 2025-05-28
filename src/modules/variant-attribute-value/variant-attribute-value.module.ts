import { Module } from '@nestjs/common';
import { VariantAttributeValueService } from './variant-attribute-value.service';
import { VariantAttributeValueController } from './variant-attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantAttributeValue } from './entities/variant-attribute-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariantAttributeValue])],
  controllers: [VariantAttributeValueController],
  providers: [VariantAttributeValueService],
  exports: [VariantAttributeValueService],
})
export class VariantAttributeValueModule { }
