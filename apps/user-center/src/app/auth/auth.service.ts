import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 验证用户有效性，这个在local策略里用到
  async validateUser(user: LoginDto): Promise<any> {
    const username = user.username;
    const password = user.password;
    if (_.isEmpty(username) || _.isEmpty(password)) {
      throw new BadRequestException('user is required!');
    }
    // 去数据库查找该user
    const loginUser = await this.userService.findLoginUser(username);
    if (_.isEmpty(loginUser)) {
      throw new BadRequestException('user not found!');
    }
    const isValidPwd = await bcrypt.compare(password, loginUser.password);
    if (!isValidPwd) {
      throw new BadRequestException('password is not valid!');
    }
    const sanitizedUser = {
      id: loginUser.id,
      username: loginUser.username,
      email: loginUser.email,
      name: loginUser.name,
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
}
