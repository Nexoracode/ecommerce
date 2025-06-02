import { VariantAttributeValue } from "src/modules/attributes/variant-attribute-value/entities/variant-attribute-value.entity";
import { Product } from "src/modules/product/entities/product.entity";

export interface IVariantProduct {
    id: number;
    price: number;
    stock: number;
    sku: string;
    product: Product;
    attributes: VariantAttributeValue[];
}