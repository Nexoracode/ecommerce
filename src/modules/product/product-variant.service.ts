import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductVariant } from "./entity/product-variant.entity";
import { Repository, In } from "typeorm";
import { CreateProductVariantDto } from "./dto/create-product-variant.dto";
import { ProductService } from "./product.service";
import { AttributeValue } from "./entity/attribute-value.entity";

@Injectable()
export class ProductVariantService {
    constructor(
        @InjectRepository(ProductVariant)
        private readonly pvRepo: Repository<ProductVariant>,
        private readonly productService: ProductService,
        @InjectRepository(AttributeValue)
        private readonly attrValRepo: Repository<AttributeValue>,
    ) { }

    async findAllProductVariant() {
        return await this.pvRepo.find()
    }

    async createPV(createDto: CreateProductVariantDto) {
        const attrValues = await this.attrValRepo.findBy({ id: In(createDto.attributeValueIds) });
        const product = await this.productService.findProductById(createDto.productId);
        const pv = this.pvRepo.create({
            stock: createDto.stock,
            price: createDto.price,
            product,
            attributeValues: attrValues
        });
        return await this.pvRepo.save(pv);
    }
}