import { VariantProduct } from "../entities/variant-product.entity";
import { IVariantProductGroupedResponse, IVariantProductResponse, VariantGroupItem } from "../interfaces/variant-product.response.interface";

export class VariantProductMapper {
    static toGroupedResponse(variant: VariantProduct): IVariantProductGroupedResponse {
        const grouped: Record<string, VariantGroupItem[]> = {};
        for (const attr of variant.attributes || []) {
            const groupName = attr.attribute?.group?.name || 'مشصخات کلی';
            if (!grouped[groupName]) grouped[groupName] = [];
            grouped[groupName].push({
                attribute: attr.attribute?.name || "مشخصات کلی",
                value: attr.value?.value || "مشخصات کلی",
            });
        }

        return {
            id: variant.id,
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
            groups: Object.entries(grouped).map(([group, items]) => ({ group, items }))
        };
    }


    static toGroupResponseList(variants: VariantProduct[]): IVariantProductGroupedResponse[] {
        return variants.map(variant => this.toGroupedResponse(variant))
    }

    static toFlatResponse(variant: VariantProduct): IVariantProductResponse {
        return {
            id: variant.id,
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
            productId: variant.product?.id || 0,
            attributes: (variant.attributes || []).map(attr => ({
                attributeId: attr.attribute?.id || 0,
                valueId: attr.value?.id || 0,
            })),
        };
    }
}