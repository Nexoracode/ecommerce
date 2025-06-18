import { Role } from "src/common/enums/role.enum";
import { IsArray, IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Length, Matches, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Birthday } from "../embedded/birthday.embedded";
import { Type } from "class-transformer";

export class birthdayDto {

    @IsNumber()
    birthDay: number;

    @IsNumber()
    birthMonth: number;

    @IsNumber()
    birthYear: number;
}

export class AccessibilityDto {

    @IsBoolean()
    hasPhysicalLimitations: boolean;

    @IsBoolean()
    isBlind: boolean;

    @IsBoolean()
    isDeaf: boolean;
}

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
    @IsString()
    @IsOptional()
    job?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    nationalIdentityNumber?: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => birthdayDto)
    birthday: birthdayDto

    @ApiProperty()
    @ValidateNested()
    @Type(() => AccessibilityDto)
    accessibility: AccessibilityDto;
}