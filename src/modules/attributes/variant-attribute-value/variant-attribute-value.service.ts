import { Injectable } from '@nestjs/common';
import { CreateVariantAttributeValueDto } from './dto/create-variant-attribute-value.dto';
import { UpdateVariantAttributeValueDto } from './dto/update-variant-attribute-value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VariantAttributeValue } from './entities/variant-attribute-value.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VariantAttributeValueService {
  constructor(
    @InjectRepository(VariantAttributeValue)
    private readonly vavRepo: Repository<VariantAttributeValue>
  ) { }

  async create(dto: CreateVariantAttributeValueDto) {
    const vav = this.vavRepo.create({
      variant: { id: dto.variantId },
      value: { id: dto.valueId },
      attribute: { id: dto.attributeId }
    });
    return await this.vavRepo.save(vav);
  }

  async findAll() {
    return await this.vavRepo.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} variantAttributeValue`;
  }

  async update(id: number, dto: UpdateVariantAttributeValueDto) {
    return `This action updates a #${id} variantAttributeValue`;
  }

  async remove(id: number) {
    return `This action removes a #${id} variantAttributeValue`;
  }
}
