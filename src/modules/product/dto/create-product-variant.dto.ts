import { IsArray, IsNumber } from "class-validator";

export class CreateProductVariantDto {
    @IsNumber()
    stock: number;

    @IsNumber()
    price: number;

    @IsNumber()
    productId: number;

    @IsArray()
    attributeValueIds: number[];
}