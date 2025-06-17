import { Role } from "src/common/enums/role.enum";
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty()
    @IsString()
    @Length(11, 11)
    @Matches(/^09\d{9}$/, { message: 'Phone number must be a valid Iranian mobile number' })
    @IsOptional()
    phone: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isPhoneVerified: boolean;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(6, 100)
    password: string;

    @ApiProperty({ enum: Role })
    @IsOptional()
    role: Role;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatarUrl: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    addresses: number[];
}