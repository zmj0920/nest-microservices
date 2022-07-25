import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(private readonly configService: ConfigService) {}

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
