import { IsNotEmpty, IsPhoneNumber, Validate } from "class-validator";
import { IsEmailOrMobileConstraint } from "./validator";

export class RequestDto {
    @IsNotEmpty()
    @Validate(IsEmailOrMobileConstraint)
    identifier: string;
}