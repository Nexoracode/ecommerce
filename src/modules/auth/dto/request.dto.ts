import { IsPhoneNumber } from "class-validator";

export class RequestDto {
    @IsPhoneNumber('IR')
    phone: string;
}