import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryAttribute } from "./entity/category-attribute.entity";
import { Repository } from "typeorm";
import { CreateCategoryAttributeDto } from "./dto/create-category-attr.dto";
import { UpdateCategoryAttributeDto } from "./dto/update-category-attr.dto";

@Injectable()
export class CategoryAttributeService {
    constructor(
        @InjectRepository(CategoryAttribute)
        private readonly catAttrRepo: Repository<CategoryAttribute>
    ) { }

    async findAllCatAttr() {
        return await this.catAttrRepo.find();
    }

    async findCatAttrById(catId: number) {
        const catAttr = await this.catAttrRepo.findOne({ where: { id: catId } });
        if (!catAttr) throw new NotFoundException('category attribute not found');
        return catAttr;
    }

    async createCatAttr(createDto: CreateCategoryAttributeDto) {
        let catAttr = await this.catAttrRepo.findOne({ where: { name: createDto.name } })
        if (catAttr) throw new BadRequestException('category name exists');
        catAttr = this.catAttrRepo.create(createDto);
        return await this.catAttrRepo.save(catAttr);
    }

    async updateCatAttr(updateDto: UpdateCategoryAttributeDto, catId: number) {
        let catAttr = await this.findCatAttrById(catId);
        catAttr.name = updateDto.name;
        catAttr.slug = updateDto.slug;
        return await this.catAttrRepo.save(catAttr);
    }
}