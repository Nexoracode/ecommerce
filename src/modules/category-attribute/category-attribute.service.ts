import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryAttributeDto } from './dto/create-category-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryAttribute } from './entities/category-attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryAttributeService {
  constructor(
    @InjectRepository(CategoryAttribute)
    private readonly repo: Repository<CategoryAttribute>
  ) { }

  async assign(dto: CreateCategoryAttributeDto) {
    const exists = await this.repo.findOne({
      where: {
        category: { id: dto.categoryId },
        attribute: { id: dto.attributeId }
      }
    });
    if (exists) throw new BadRequestException('این ویژگی قبلا برای این دسته تخصیص داده شده است');


    const relation = this.repo.create({
      category: { id: dto.categoryId },
      attribute: { id: dto.attributeId }
    });
    return await this.repo.save(relation);
  }

  async generateAttributeForCategory(categoryId: number) {
    return await this.repo.find({
      where: {
        category: { id: categoryId },
      },
      relations: ['attribute'],
    });
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }

}
