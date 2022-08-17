import {
  Controller,
  Post,
  VERSION_NEUTRAL,
  Body,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetRolesByIdDto, SetRolesDto } from './user-role.dto';
import { UserRoleService } from './user-role.service';

@ApiTags('用户角色信息')
@Controller({ path: 'userRole', version: VERSION_NEUTRAL })
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @ApiOperation({
    summary: '用户绑定角色',
  })
  @Put('userBoundRole')
  async userBoundRole(@Body() dto: SetRolesDto) {
    return await this.userRoleService.setUserRoles(dto.userId, dto.roleIds);
  }

  @ApiOperation({
    summary: '用户获取角色列表',
  })
  @Post('/getRolesById')
  getRolesById(@Body() dto: GetRolesByIdDto) {
    return this.userRoleService.getRolesById(dto.userId);
  }
}
