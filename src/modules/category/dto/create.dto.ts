import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    slug: string;

    parentId?: number;
}