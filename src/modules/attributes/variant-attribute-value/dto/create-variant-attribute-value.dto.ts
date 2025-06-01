import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVariantAttributeValueDto {
    @IsNotEmpty()
    @IsNumber()
    variantId: number;

    @IsNotEmpty()
    @IsNumber()
    attributeId: number;

    @IsNotEmpty()
    @IsNumber()
    valueId: number;
}
