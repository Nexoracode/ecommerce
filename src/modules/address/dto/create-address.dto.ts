import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    province: string;

    @IsNotEmpty()
    @IsString()
    addressLine: string;

    @IsOptional()
    @IsString()
    postalCode: string;

    @IsOptional()
    @IsBoolean()
    isPrimary: boolean;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}