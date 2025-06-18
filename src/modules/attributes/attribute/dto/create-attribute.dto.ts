import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateAttributeDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => (value ? Number(value) : null))
    @Transform(({ obj }) => obj.group_id, { toClassOnly: true })
    groupId: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isPublic: boolean;
}