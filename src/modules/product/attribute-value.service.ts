import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AttributeValue } from "./entity/attribute-value.entity";
import { Repository } from "typeorm";
import { AttributeService } from "./attribute.service";

@Injectable()
export class AttributeValueService {
    constructor(
        @InjectRepository(AttributeValue)
        private readonly avRepo: Repository<AttributeValue>,
        private readonly attributeService: AttributeService
    ) { }

    async findAValue() {
        return await this.avRepo.find({ relations: ['attribute'] });
    }

    async findAValueById(avId: number) {
        const av = await this.avRepo.findOne({ where: { id: avId }, relations: ['attribute'] });
        if (!av) throw new NotFoundException('attribute not found');
        return av;
    }

    async createAValue(value: string, attributeId: number) {
        const attribute = await this.attributeService.findAttributeById(attributeId);
        const attributeValue = this.avRepo.create({ value, attribute });
        return this.avRepo.save(attributeValue);
    }

    async updateAValue(value: string, attributeId: number, avId: number) {
        const av = await this.findAValueById(avId);
        const attribute = await this.attributeService.findAttributeById(attributeId);
        av.value = value;
        av.attribute = attribute;
        return await this.avRepo.save(av);
    }
}