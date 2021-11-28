import { IsEmail, Length } from "class-validator"
import { UniqueOnDatabase } from "src/auth/validations/UniqueValidation";
import { UserEntity } from "../entities/user.entity";


export class CreateUserDto {
    @Length(3)
    fullName: string;
    @UniqueOnDatabase(UserEntity)
    @IsEmail(undefined, { message: "Неверная почта" })
    email: string;

    @Length(6, 32, { message: "Минимум 6 символов" })
    password?: string;
}
