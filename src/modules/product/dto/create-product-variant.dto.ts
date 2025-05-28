import { IsArray, IsNumber, IsOptional } from "class-validator";

export class CreateProductVariantDto {
    @IsNumber()
    stock: number;

    @IsNumber()
    price: number;

    @IsNumber()
    productId: number;

    @IsOptional()
    sku: string;
}