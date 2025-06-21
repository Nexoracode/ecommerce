import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    slug: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    discount: string;

    @ApiProperty()
    parentId: number;
}