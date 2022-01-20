import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNotEmpty()
    readonly  isActive: boolean;
}