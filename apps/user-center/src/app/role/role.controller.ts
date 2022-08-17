import { BusinessException } from '@app/common';
import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrivilegeService } from '../privilege/privilege.service';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import {
  CreateRoleDto,
  DeleteRoleDto,
  GetPrivilegeListByIdDto,
  RoleListWithPaginationDto,
  RolePrivilegeSetDto,
  UpdateRoleDto,
} from './role.dto';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('角色')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly rolePrivilegeService: RolePrivilegeService,
    private readonly privilegeService: PrivilegeService,
  ) {}

  @ApiOperation({
    summary: '创建新角色',
  })
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({
    summary: '修改角色信息',
  })
  @Put('update')
  async update(@Body() dto: UpdateRoleDto) {
    const foundRole = await this.roleService.findById(dto.id);
    if (!foundRole) {
      throw new BusinessException('未找到角色');
    }
    return await this.roleService.update({ ...foundRole, ...dto });
  }

  @ApiOperation({
    summary: '删除角色',
    description:
      '如果发现角色有绑定权限，权限将同步删除 Role - privilege 关系表',
  })
  @Delete('/delete')
  async delete(@Body() dto: DeleteRoleDto) {
    return await this.roleService.delete(dto.id);
  }

  // @ApiOperation({
  //   summary: '角色列表',
  // })
  // @Get('/list')
  // async list() {
  //   return await this.roleService.list();
  // }

  @ApiOperation({
    summary: '角色 ID 查权限',
    description: '根据角色 id 查权限列表',
  })
  @Post('/getPrivilegeListById')
  async getPrivilegeListById(@Body() dto: GetPrivilegeListByIdDto) {
    const rolePrivilegeList = await this.rolePrivilegeService.listByRoleIds([
      dto.roleId,
    ]);
    const privilegeList = await this.privilegeService.findByIds(
      rolePrivilegeList.map((rp) => rp.privilegeId),
    );
    return privilegeList;
  }

  @ApiOperation({
    summary: '角色列表（分页）',
    description: '根据角色名称查询',
  })
  @Post('/list')
  async listWithPagination(@Body() dto: RoleListWithPaginationDto) {
    const { page, ...searchParams } = dto;
    const pageData = await this.roleService.paginate(searchParams, page);
    return pageData;
  }

  @ApiOperation({
    summary: '角色分配权限',
    description: '',
  })
  @Put('permission')
  async set(@Body() dto: RolePrivilegeSetDto) {
    await this.rolePrivilegeService.remove(dto.roleId);
    return await this.rolePrivilegeService.set(dto.roleId, dto.privilegeIds);
  }
}
