import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAttributeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    slug: string;

    @IsNumber()
    @Transform(({ value }) => Number(value))
    @Transform(({ obj }) => obj.category_id, { toClassOnly: true })
    categoryId: number;
}