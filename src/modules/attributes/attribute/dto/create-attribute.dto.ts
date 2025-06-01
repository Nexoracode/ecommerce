import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAttributeDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : null))
    @Transform(({ obj }) => obj.group_id, { toClassOnly: true })
    groupId: number;

    @IsOptional()
    @IsBoolean()
    isPublic: boolean;
}