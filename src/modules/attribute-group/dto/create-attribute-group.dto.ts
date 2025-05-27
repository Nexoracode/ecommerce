import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAttributeGroupDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
}
