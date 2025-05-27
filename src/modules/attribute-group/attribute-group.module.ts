import { Module } from '@nestjs/common';
import { AttributeGroupService } from './attribute-group.service';
import { AttributeGroupController } from './attribute-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeGroup } from './entities/attribute-group.entity';
import { CategoryModule } from '../category/category.module';
import { AttributeService } from '../attribute/attribute.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeGroup]), CategoryModule],
  controllers: [AttributeGroupController],
  providers: [AttributeGroupService],
  exports: [AttributeGroupService]
})
export class AttributeGroupModule { }
