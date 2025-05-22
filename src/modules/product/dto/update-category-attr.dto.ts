import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCategoryAttributeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    slug: string;
}