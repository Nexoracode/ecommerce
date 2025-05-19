import { IsNotEmpty, IsPhoneNumber, Validate } from "class-validator";
import { IsEmailOrMobileConstraint } from "./validator";

export class VerifyOtpDto {
    @IsNotEmpty()
    @Validate(IsEmailOrMobileConstraint)
    identifier: string;

    @IsNotEmpty()
    code: string;
}