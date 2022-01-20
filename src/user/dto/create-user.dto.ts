import {IsNotEmpty, MinLength, IsEmail, IsEnum, Length} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(3)
    readonly firstName: string;

    @IsNotEmpty()
    @IsEmail(undefined, { message: 'Неверная почта' })
    readonly email: string;

    @IsNotEmpty()
    @Length(2, 32, { message: 'Пароль должен быть минимум из 2 символов'})
    readonly password: string;

    readonly  isActive: boolean;
}