import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAttributeValueDto {
    @IsNotEmpty()
    value: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @Transform(({ obj }) => obj.attribute_id, { toClassOnly: true })
    attributeId: number;
}