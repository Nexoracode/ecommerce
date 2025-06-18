import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdatePasswordDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    oldPassword: string;

    @ApiProperty()
    @IsString()
    newPassword1: string;

    @ApiProperty()
    @IsString()
    newPassword2: string;
}