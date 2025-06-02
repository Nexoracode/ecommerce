import { IsNumber, IsString } from "class-validator";

export class CreateVariantProductDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsString()
    sku: string;
}
