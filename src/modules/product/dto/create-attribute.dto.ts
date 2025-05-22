import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAttributeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    slug: string;

    @IsNumber()
    categoryId: number;
}