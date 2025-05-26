import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';
import { CategoryAttributeService } from '../category-attribute/category-attribute.service';
import { CategoryAttribute } from '../category-attribute/entities/category-attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepo: Repository<Attribute>,

    @InjectRepository(CategoryAttribute)
    private readonly categoryAttributeRepo: Repository<CategoryAttribute>,
  ) { }

  async create(createDto: CreateAttributeDto) {
    const exists = await this.attributeRepo.findOneBy({ slug: createDto.slug });
    if (exists) throw new BadRequestException('slug exists');
    const attr = this.attributeRepo.create(createDto);
    return await this.attributeRepo.save(attr);
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
    const attr = await this.attributeRepo.preload({ id, ...updateDto });
    if (!attr) throw new NotFoundException('attr not found');
    return await this.attributeRepo.save(attr);

  }

  async remove(id: number) {
    const attr = await this.attributeRepo.findOneBy({ id });
    if (!attr) throw new NotFoundException('attr not found');
    return await this.attributeRepo.remove(attr);
  }

  async findByCategory(categoryId: number) {
    const relation = await this.categoryAttributeRepo.find({
      where: { category: { id: categoryId } },
      relations: ['attribute'],
    });
    return relation.map(rel => rel.attribute);
  }
}
