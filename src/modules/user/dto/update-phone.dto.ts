import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePhoneDto {

    @IsNotEmpty()
    @IsString()
    phone: string;
}