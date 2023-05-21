import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    username: string; // Никнейм пользователя

    @IsEmail()
    email: string; // электронная почта пользователя

    @MinLength(6, {message: 'Минимальная длина пароля - 6 символов'})
    password: string; // пароль пользователя
}
