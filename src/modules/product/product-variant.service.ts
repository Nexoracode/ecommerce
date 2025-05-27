import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductVariant } from "./entity/product-variant.entity";
import { Repository, In } from "typeorm";
import { CreateProductVariantDto } from "./dto/create-product-variant.dto";
import { ProductService } from "./product.service";
import { AttributeValueService } from "../attribute-value/attribute-value.service";

@Injectable()
export class ProductVariantService {
    constructor(
        @InjectRepository(ProductVariant)
        private readonly pvRepo: Repository<ProductVariant>,
        private readonly productService: ProductService,
        private readonly attributeValueService: AttributeValueService,
    ) { }

    async findAllProductVariant() {
        return await this.pvRepo.find();
    }

    async createPV(createDto: CreateProductVariantDto) {
        const attrValues = await this.attributeValueService.findBy(createDto.attributeValueIds);
        const product = await this.productService.findProductById(createDto.productId);
        const pv = this.pvRepo.create({
            stock: createDto.stock,
            price: createDto.price,
            product,
            attributes: attrValues.map(attrValue => {
                return {
                    attribute: attrValue.attribute,
                    value: attrValue,
                };
            }),
        });
        return await this.pvRepo.save(pv);
    }
}