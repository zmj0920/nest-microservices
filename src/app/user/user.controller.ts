import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller({ path: 'user', version: VERSION_NEUTRAL })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiOperation({
    summary: '异常处理',
  })
  @Get('exception')
  exception() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (error) {
      throw new BusinessException('你这个参数错了');
    }
    return this.userService.findAll();
  }

  @Get('getTestName')
  getHello(): string {
    console.log(this.configService.get('TEST_VALUE').name);
    return this.configService.get('TEST_VALUE').name;
  }

  @ApiOperation({
    summary: '查询所有用户版本兼容',
  })
  @Get('findAll2')
  @Version('2') // 只支持 2版本
  findAll2() {
    return 'i am new one';
  }
}
