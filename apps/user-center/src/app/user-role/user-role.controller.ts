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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetRolesByIdDto, SetRolesDto } from './user-role.dto';
import { UserRoleService } from './user-role.service';

@ApiTags('用户角色信息')
@Controller({ version: VERSION_NEUTRAL })
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @ApiOperation({
    summary: '设置用户角色',
  })
  @Post('setRoles')
  async setRoles(@Body() dto: SetRolesDto) {
    return await this.userRoleService.setUserRoles(dto.userId, dto.roleIds);
  }

  @ApiOperation({
    summary: '通过用户 ID 获取角色列表',
  })
  @Post('/getRolesById')
  getRolesById(@Body() dto: GetRolesByIdDto) {
    return this.userRoleService.getRolesById(dto.userId);
  }
}
