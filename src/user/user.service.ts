import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    const doc = await this.userRepository.findOne({ where: { username } });
    if (doc) {
      throw new HttpException('username alreay exists', HttpStatus.BAD_REQUEST);
    }

    // should create then save, not just save, otherwise it will not trigger @BeforeInsert
    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }

  async findAll(query) {
    const qb = await this.userRepository.createQueryBuilder('user');
    qb.orderBy('user.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const users = await qb.getMany();
    return { list: users, count: count };
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, user: UpdateUserDto) {
    const existUser = await this.userRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new HttpException(`current user does not exist`, 401);
    }
    const newPsw = await bcrypt.hashSync(user.password, 10)
    const updateUser = this.userRepository.merge(existUser, { ...user, password: newPsw });
    return this.userRepository.save(updateUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
