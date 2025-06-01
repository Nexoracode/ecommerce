import { forwardRef, Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { AttributeGroupModule } from '../attribute-group/attribute-group.module';
import { CategoryAttribute } from 'src/modules/category-attribute/entities/category-attribute.entity';
import { CategoryAttributeModule } from 'src/modules/category-attribute/category-attribute.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, CategoryAttribute]), CategoryAttributeModule, AttributeGroupModule],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule { }
