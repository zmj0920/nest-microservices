import {
  Controller,
  Get,
  Post,
  Body,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

@ApiTags('用户信息')
@Controller({ path: 'user', version: VERSION_NEUTRAL })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
