import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class RegisterDto {

    @IsNotEmpty()
    phone: string;

}