import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpDto {

    @ApiProperty({ description: 'email or phone' })
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    code: string;
}