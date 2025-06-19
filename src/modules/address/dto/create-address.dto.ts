import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

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
    @Length(10, 10)
    postalCode: string;

    @IsOptional()
    @IsBoolean()
    isPrimary: boolean | false;
}