import { CreateUserDto } from './../user/dto/create-user.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({ email, password })
    if (user && password === user.password) {
      const { password, ...result } = user

      return result
    }

  }


  generateJwtToken(data: { id: number, email: string }) {
    const payload = { sub: data.id, email: data.email }
    return this.jwtService.sign(payload)
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData)
    }
  }

  async register(dto: CreateUserDto) {
    try {
      const { password, ...userData } = await this.usersService.create(dto)
      return {
        ...userData,
        token: this.generateJwtToken(userData)
      }
    } catch (err) {
      throw new ForbiddenException("Ошибка при регистрации")
    }
  }



}
