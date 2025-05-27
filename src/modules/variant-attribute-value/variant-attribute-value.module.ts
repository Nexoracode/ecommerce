import { Module } from '@nestjs/common';
import { VariantAttributeValueService } from './variant-attribute-value.service';
import { VariantAttributeValueController } from './variant-attribute-value.controller';

@Module({
  controllers: [VariantAttributeValueController],
  providers: [VariantAttributeValueService],
})
export class VariantAttributeValueModule {}
