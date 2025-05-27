import { forwardRef, Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { CategoryAttributeModule } from '../category-attribute/category-attribute.module';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { AttributeValueService } from '../attribute-value/attribute-value.service';
import { CategoryAttribute } from '../category-attribute/entities/category-attribute.entity';
import { AttributeGroupService } from '../attribute-group/attribute-group.service';
import { AttributeGroupModule } from '../attribute-group/attribute-group.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, CategoryAttribute]), CategoryAttributeModule, AttributeGroupModule],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule { }
