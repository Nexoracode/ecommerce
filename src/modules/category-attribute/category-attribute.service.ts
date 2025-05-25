import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryAttributeDto } from './dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from './dto/update-category-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryAttribute } from './entities/category-attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryAttributeService {
  constructor(
    @InjectRepository(CategoryAttribute)
    private readonly catAttrRepo: Repository<CategoryAttribute>
  ) { }

  async create(createDto: CreateCategoryAttributeDto) {
    let catAttr = await this.catAttrRepo.findOne({ where: { name: createDto.name } })
    if (catAttr) throw new BadRequestException('category name exists');
    catAttr = this.catAttrRepo.create(createDto);
    return await this.catAttrRepo.save(catAttr);
  }

  async findAll() {
    return await this.catAttrRepo.find();
  }

  async findOne(id: number) {
    const catAttr = await this.catAttrRepo.findOne({ where: { id: id } });
    if (!catAttr) throw new NotFoundException('category attribute not found');
    return catAttr;
  }

  async update(id: number, updateDto: UpdateCategoryAttributeDto) {
    let catAttr = await this.findOne(id);
    catAttr.name = updateDto.name!;
    catAttr.slug = updateDto.slug!;
    return await this.catAttrRepo.save(catAttr);
  }

  async remove(id: number) {
    const catAttr = await this.findOne(id);
    this.catAttrRepo.remove(catAttr);
    return await this.catAttrRepo.save(catAttr);
  }
}
