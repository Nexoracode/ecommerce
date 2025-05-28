import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductVariant } from "./entity/product-variant.entity";
import { Repository, In } from "typeorm";
import { CreateProductVariantDto } from "./dto/create-product-variant.dto";
import { ProductService } from "./product.service";
import { VariantAttributeValueService } from "../variant-attribute-value/variant-attribute-value.service";
@Injectable()
export class ProductVariantService {
    constructor(
        @InjectRepository(ProductVariant)
        private readonly pvRepo: Repository<ProductVariant>,
        private readonly pService: ProductService,
    ) { }

    async findVariantByProduct(productId: number) {
        await this.pService.findProductById(productId);
        const variants = await this.pvRepo.find({
            where: { product: { id: productId } },
            relations: ['attributes', 'attributes.attribute', 'attributes.attribute.group', 'attributes.value']
        });
        return variants.map(variant => {
            const grouped = {};
            for (const attr of variant.attributes) {
                const groupName = attr.attribute.group?.name || 'مشخصات کلی';
                if (!grouped[groupName]) grouped[groupName] = [];
                grouped[groupName].push({
                    attribute: attr.attribute.name,
                    value: attr.value.value,
                })
            }

            return {
                id: variant.id,
                sku: variant.sku,
                price: variant.price,
                stock: variant.stock,
                groups: Object.entries(grouped).map(([group, items]) => ({
                    group,
                    items,
                }))
            }
        });
    }

    async createPV(createDto: CreateProductVariantDto) {
        const product = await this.pService.findProductById(createDto.productId);
        const pv = this.pvRepo.create({
            stock: createDto.stock,
            price: createDto.price,
            sku: createDto.sku,
            product,
        });
        return await this.pvRepo.save(pv);
    }
}