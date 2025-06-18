import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateAddressDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    province: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    addressLine: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(10, 10)
    postalCode: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isPublic: boolean | false;
}