import {IsNotEmpty, MinLength, IsEmail, IsEnum, Length} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail(undefined, { message: 'Неверная почта' })
    readonly email: string;

    @IsNotEmpty()
    @Length(2, 32, { message: 'Пароль должен быть минимум из 2 символов'})
    readonly password: string;

}