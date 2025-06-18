import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RequestDto {

    @ApiProperty()
    @IsNotEmpty()
    phone: string;
}