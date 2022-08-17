import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.mysql.entity';
import * as bcrypt from 'bcrypt';
import {
  BCRYPT_SIZE,
  BusinessException,
  getPaginationOptions,
} from '@app/common';
import { CreateUserDto, LoginDto, UserListWithPaginationDto } from './user.dto';

import { JwtService } from '@nestjs/jwt';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(user: CreateUserDto) {
    const { username } = user;
    if (!username) {
      throw new BusinessException('please enter username!');
    } else {
      const loginUser = await this.findLoginUser(username);
      if (!loginUser) {
        const password = user.password;
        user.password = await bcrypt.hashSync(password, BCRYPT_SIZE);
        return this.userRepository.save(user);
      } else {
        throw new BusinessException('user information exists!');
      }
    }
  }

  // 根据id 查询用户信息
  profile(id) {
    return this.userRepository.findOneBy(id);
  }

  //查询所有用户
  findAll() {
    return this.userRepository.find();
  }

  //根据用户名查询用户信息
  findLoginUser(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  // 验证用户有效性，这个在local策略里用到
  async validateUser(user: LoginDto): Promise<any> {
    const username = user.username;
    const password = user.password;
    if (!username || !password) {
      throw new BusinessException('user is required!');
    }
    // 去数据库查找该user
    const loginUser = await this.findLoginUser(username);
    if (!loginUser) {
      throw new BusinessException('user not found!', 10000);
    }
    const isValidPwd = await bcrypt.compare(password, loginUser.password);
    if (!isValidPwd) {
      throw new BusinessException('account or password error!');
    }
    const sanitizedUser = {
      id: loginUser.id,
      username: loginUser.username,
      email: loginUser.email,
      name: loginUser.name,
      status: loginUser.status,
    };
    return sanitizedUser;
  }

  // 登录接口服务层
  async login(userInfo: any) {
    const access_token = this.jwtService.sign(userInfo);

    return {
      userInfo,
      access_token,
    };
  }

  async paginate(
    searchParams: UserListWithPaginationDto,
    page: PaginationParams,
  ): Promise<Pagination<User, CustomPaginationMeta>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.orderBy('user.updateTime', 'DESC');
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('user.name LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
      queryBuilder.orWhere('user.username LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }
    return paginate<User, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(page),
    );
  }

  async getUserById(id: string) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  createOrSave(user: User) {
    this.userRepository.save(user);
  }

  async detete(id: string) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new BusinessException(`${id} not exist`);
    }
    this.userRepository.delete(id);
    return user;
  }
}
