import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.mysql.entity';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SIZE } from '@app/common/utils/constants';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const password = user.password;
    user.password = await bcrypt.hashSync(password, BCRYPT_SIZE);
    return this.userRepository.save(user);
  }

  profile(id) {
    return this.userRepository.findOneBy(id);
  }

  findAll() {
    return this.userRepository.find();
  }

  findLoginUser(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }
}
