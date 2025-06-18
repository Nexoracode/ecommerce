import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryAttributeDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    attributeId: number;
}