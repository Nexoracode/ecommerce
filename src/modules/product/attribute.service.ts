import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attribute } from "./entity/attribute.entity";
import { Repository } from "typeorm";

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attribute)
        private readonly attributeRepo: Repository<Attribute>
    ) { }

    async createAttribute(name: string) {
        let attribute = await this.attributeRepo.findOne({ where: { name } });
        if (attribute) throw new BadRequestException('attribute name exists');
        attribute = this.attributeRepo.create({ name })
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

    async updateAttribute(id: number, name: string) {
        const attribute = await this.findAttributeById(id);
        attribute.name = name;
        return await this.attributeRepo.save(attribute);
    }
}