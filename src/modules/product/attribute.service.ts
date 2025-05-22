import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attribute } from "./entity/attribute.entity";
import { Repository } from "typeorm";
import { CreateAttributeDto } from "./dto/create-attribute.dto";
import { CategoryAttributeService } from "./category-attribute.service";
import { UpdateAttributeDto } from "./dto/update-attribute.dto";

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attribute)
        private readonly attributeRepo: Repository<Attribute>,
        private readonly catAttrService: CategoryAttributeService,
    ) { }

    async createAttribute(createDto: CreateAttributeDto) {
        let attribute = await this.attributeRepo.findOne({ where: { name: createDto.name } });
        if (attribute) throw new BadRequestException('attribute name exists');
        const catAttr = await this.catAttrService.findCatAttrById(createDto.categoryId);
        attribute = this.attributeRepo.create({
            name: createDto.name,
            slug: createDto.slug,
            categoryAttr: catAttr,
        })
        return await this.attributeRepo.save(attribute);
    }

    async findAllAttribute() {
        return await this.attributeRepo.find();
    }

    async findAttributeById(id: number) {
        const attribute = await this.attributeRepo.findOne({ where: { id } });
        if (!attribute) throw new NotFoundException('attribute not found');
        return attribute;
    }

    async updateAttribute(id: number, updateDto: UpdateAttributeDto) {
        const attribute = await this.findAttributeById(id);
        const catAttr = await this.catAttrService.findCatAttrById(updateDto.categoryId);
        attribute.name = updateDto.name;
        attribute.slug = updateDto.slug;
        attribute.categoryAttr = catAttr;
        return await this.attributeRepo.save(attribute);
    }
}