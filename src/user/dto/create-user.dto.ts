import { IsEmail, Length } from "class-validator"


export class CreateUserDto {
    @Length(3)
    fullName: string;

    @IsEmail(undefined, { message: "Неверная почта" })
    email: string;

    @Length(6, 32, { message: "Минимум 6 символов" })
    password?: string;
}
