import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAttributeValueDto {

    @ApiProperty()
    @IsNotEmpty()
    value: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @Transform(({ obj }) => obj.attribute_id, { toClassOnly: true })
    attributeId: number;
}