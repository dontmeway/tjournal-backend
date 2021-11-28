import { SearchUserDto } from './dto/search-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) { }
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne(id);
  }

  findByCond(obj: LoginUserDto) {
    return this.repository.findOne(obj);
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }


  async search(dto: SearchUserDto) {
    const qb = this.repository.createQueryBuilder("user");

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    if (dto.email) {
      qb.andWhere('user.email ILIKE :email')
    }

    if (dto.fullName) {
      qb.andWhere('user.fullName ILIKE :fullName')
    }

    qb.setParameters({
      fullName: `%${dto.fullName}%`,
      email: `%${dto.email}%`,
    })
    const [items, total] = await qb.getManyAndCount();
    return { items, total }
  }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
