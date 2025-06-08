import { Role } from "src/common/enums/role.enum";
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @Length(11, 11)
    @Matches(/^09\d{9}$/, { message: 'Phone number must be a valid Iranian mobile number' })
    @IsOptional()
    phone: string;

    @IsBoolean()
    @IsOptional()
    isPhoneVerified: boolean;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @Length(6, 100)
    password: string;

    @IsOptional()
    role: Role;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsOptional()
    avatarUrl: string;

    @IsArray()
    @IsOptional()
    addresses: number[];
}