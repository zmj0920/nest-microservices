import {
  Controller,
  Post,
  UseGuards,
  Res,
  VERSION_NEUTRAL,
  Query,
  Body,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  JwtAuthGuard,
  LocalAuthGuard,
  Public,
  PayloadUser,
  BusinessException,
} from '@app/common';
import { MessagePattern, Payload as MicroPayload } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import {
  CreateUserDto,
  DeleteUserDto,
  DisableUserDto,
  LoginDto,
  UserListWithPaginationDto,
} from './user.dto';

@ApiTags('用户信息')
@Controller({ path: 'user', version: VERSION_NEUTRAL })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '退出登录',
    description: '服务器端清除 jwt cookies',
  })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: FastifyReply) {
    response.setCookie('jwt', '');
    return {};
  }

  @ApiOperation({
    summary: '用户登录',
    description: '用户登录',
  })
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

  @ApiOperation({
    summary: '个人信息',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@PayloadUser() user: Payload) {
    return user;
  }

  @MessagePattern('userCenter.user.profile')
  @Public()
  micro_profile(@MicroPayload() data: Payload) {
    return this.profile(data);
  }

  @ApiOperation({
    summary: '注册用户',
  })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '用户列表',
  })
  @Post('/list')
  async listWithPagination(@Body() dto: UserListWithPaginationDto) {
    const { page, ...searchParams } = dto;
    const users = await this.userService.paginate(searchParams, page);
    return users;
  }

  @ApiOperation({
    summary: '禁用用户',
  })
  @Put('disable')
  async changeStatus(@Body() dto: DisableUserDto) {
    const found = await this.userService.getUserById(dto.userId);
    if (!found) {
      throw new BusinessException(`未找到 ID 为 ${dto.userId} 的用户`);
    }
    return this.userService.createOrSave({ ...found, status: dto.status });
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Delete('delete')
  delete(@Body() user: DeleteUserDto) {
    const { id } = user;
    return this.userService.detete(id);
  }
}
