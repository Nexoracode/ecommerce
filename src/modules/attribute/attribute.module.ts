import { forwardRef, Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { CategoryAttributeModule } from '../category-attribute/category-attribute.module';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { AttributeValueService } from '../attribute-value/attribute-value.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute]), CategoryAttributeModule],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule { }
