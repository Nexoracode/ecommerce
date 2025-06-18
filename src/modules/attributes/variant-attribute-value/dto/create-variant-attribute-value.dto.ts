import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVariantAttributeValueDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    variantId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    attributeId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    valueId: number;
}
