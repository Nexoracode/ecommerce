import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryAttributeDto {

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @IsNotEmpty()
    @IsNumber()
    attributeId: number;
}