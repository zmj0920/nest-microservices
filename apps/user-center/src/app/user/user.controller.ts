import {
  Controller,
  Post,
  UseGuards,
  Res,
  VERSION_NEUTRAL,
  Query,
  Body,
  Get,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  LocalAuthGuard,
  Public,
  PayloadUser,
} from '@app/common';
import { MessagePattern, Payload as MicroPayload } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { CreateUserDto, LoginDto } from './user.dto';

@ApiTags('用户信息')
@Controller({ version: VERSION_NEUTRAL })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '登出',
    description: '服务器端清除 jwt cookies',
  })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: FastifyReply) {
    response.setCookie('jwt', '');
    return {};
  }

  // 登录接口
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @PayloadUser() user: Payload,
    @Res({ passthrough: true }) response: FastifyReply,
    @Query() query: LoginDto,
  ) {
    const { access_token, userInfo } = await this.userService.login(user);
    response.setCookie('jwt', access_token, {
      path: '/',
    });
    return {
      userInfo,
      access_token,
    };
  }

  // 查询个人信息
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  profile(@PayloadUser() user: Payload) {
    return user;
  }

  @MessagePattern('userCenter.user.profile')
  @Public()
  micro_profile(@MicroPayload() data: Payload) {
    return this.profile(data);
  }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }
}
