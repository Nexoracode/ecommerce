import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';
import { AttributeGroupService } from '../attribute-group/attribute-group.service';
import { CategoryAttribute } from 'src/modules/category-attribute/entities/category-attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepo: Repository<Attribute>,

    @InjectRepository(CategoryAttribute)
    private readonly categoryAttributeRepo: Repository<CategoryAttribute>,
    private readonly attributeGroupService: AttributeGroupService,
  ) { }

  async create(createDto: CreateAttributeDto) {
    const group = await this.attributeGroupService.findOne(createDto.groupId);
    const attr = this.attributeRepo.create({
      ...createDto,
      group,
      isPublic: createDto.isPublic ?? false,
    });
    return await this.attributeRepo.save(attr);
  }

  async findAll() {
    return await this.attributeRepo.find({
      relations: ['group', 'values'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    const attribute = await this.attributeRepo.findOne({ where: { id }, relations: ['group'] });
    if (!attribute) throw new NotFoundException('attribute not found');
    return attribute;
  }

  async update(id: number, updateDto: UpdateAttributeDto) {
    const group = await this.attributeGroupService.findOne(updateDto.groupId!);
    const attr = await this.attributeRepo.preload({ id, ...updateDto, group, isPublic: updateDto.isPublic ?? false });
    if (!attr) throw new NotFoundException('attr not found');
    return await this.attributeRepo.save(attr);
  }

  async remove(id: number) {
    const attr = await this.attributeRepo.findOneBy({ id });
    if (!attr) throw new NotFoundException('attr not found');
    return await this.attributeRepo.remove(attr);
  }

  async findByCategory(categoryId: number) {
    const categorySpecificAttribute = await this.categoryAttributeRepo.find({
      where: { category: { id: categoryId } },
      relations: ['attribute'],
    });
    const globalAttributes = await this.attributeRepo.find({ where: { isPublic: true } });
    const allAttributes = [...globalAttributes, ...categorySpecificAttribute.map(catAttr => catAttr.attribute)];
    return allAttributes
  }
}
