import { Module } from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { AttributeValueController } from './attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributeModule } from '../attribute/attribute.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue]), AttributeModule],
  controllers: [AttributeValueController],
  providers: [AttributeValueService],
  exports: [AttributeValueService]
})
export class AttributeValueModule { }
