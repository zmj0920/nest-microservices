import { AuthService } from './auth.service';

import {
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  VERSION_NEUTRAL,
  Query,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { PayloadUser } from '@app/common/utils';
import { LoginDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, LocalAuthGuard, Public } from '@app/common';
import { MessagePattern, Payload as MicroPayload } from '@nestjs/microservices';

@ApiTags('用户认证')
@Controller({ path: 'auth', version: VERSION_NEUTRAL })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    const { access_token, userInfo } = await this.authService.login(user);
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
}
