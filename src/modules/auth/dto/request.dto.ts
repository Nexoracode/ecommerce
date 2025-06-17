import { IsNotEmpty, IsPhoneNumber, Validate } from "class-validator";
import { IsEmailOrMobileConstraint } from "./validator";
import { ApiProperty } from "@nestjs/swagger";

export class RequestDto {

    @ApiProperty({ description: 'email or phone' })
    @IsNotEmpty()
    @Validate(IsEmailOrMobileConstraint)
    identifier: string;
}