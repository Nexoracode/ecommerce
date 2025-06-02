// variant-product-response.interface.ts

export interface IVariantProductResponse {
    id: number;
    sku: string;
    price: number;
    stock: number;
    productId: number;
    attributes: {
        attributeId: number;
        valueId: number;
    }[];
}

export interface IVariantProductGroupedResponse {
    id: number;
    sku: string;
    price: number;
    stock: number;
    groups: VariantGroup[];
}

export interface VariantGroup {
    group: string;
    items: VariantGroupItem[];
}

export interface VariantGroupItem {
    attribute: string;
    value: string;
}
