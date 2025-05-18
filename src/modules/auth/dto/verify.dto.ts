import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class VerifyOtpDto {
    @IsPhoneNumber('IR')
    phone: string;

    @IsNotEmpty()
    code: string;
}