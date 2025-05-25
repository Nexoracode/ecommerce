import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepo: Repository<Attribute>,
    private readonly catAttrService: CategoryAttributeService,
  ) { }

  async create(createDto: CreateAttributeDto) {
    let attribute = await this.attributeRepo.findOne({ where: { name: createDto.name } });
    if (attribute) throw new BadRequestException('attribute name exists');
    const catAttr = await this.catAttrService.findOne(createDto.categoryId);
    attribute = this.attributeRepo.create({
      name: createDto.name,
      slug: createDto.slug,
      categoryAttr: catAttr,
    })
    return await this.attributeRepo.save(attribute);
  }

  async findAll() {
    return await this.attributeRepo.find();
  }

  async findOne(id: number) {
    const attribute = await this.attributeRepo.findOne({ where: { id } });
    if (!attribute) throw new NotFoundException('attribute not found');
    return attribute;
  }

  async update(id: number, updateDto: UpdateAttributeDto) {
    const attribute = await this.findOne(id);
    const catAttr = await this.catAttrService.findOne(updateDto.categoryId!);
    attribute.name = updateDto.name!;
    attribute.slug = updateDto.slug!;
    attribute.categoryAttr = catAttr;
    return await this.attributeRepo.save(attribute);
  }

  async remove(id: number) {
    const attribute = await this.findOne(id);
    this.attributeRepo.remove(attribute);
    return await this.attributeRepo.save(attribute);
  }
}
