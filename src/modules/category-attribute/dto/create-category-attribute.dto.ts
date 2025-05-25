import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryAttributeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    slug: string;
}