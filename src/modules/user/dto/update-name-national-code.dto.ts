import { OmitType, PartialType } from "@nestjs/mapped-types";
import { birthdayDto, CreateUserDto } from "./create-user.dto";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNameNationalCodeUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fistName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nationalCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => birthdayDto)
    birthday: birthdayDto
}