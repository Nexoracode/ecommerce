import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateAttributeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    slug: string;

    @IsNumber()
    categoryId: number;
}