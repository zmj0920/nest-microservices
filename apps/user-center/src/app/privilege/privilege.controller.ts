import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BusinessException } from '@app/common';
import {
  CreatePrivilegeDto,
  DeletePrivilegeDto,
  DisablePrivilegeDto,
  PrivilegeListWithPaginationDto,
  UpdatePrivilegeDto,
} from './privilege.dto';
import { Privilege } from './privilege.mysql.entity';
import { PrivilegeService } from './privilege.service';

@ApiTags('权限')
@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @ApiOperation({
    summary: '创建权限',
  })
  @Post('create')
  async create(@Body() dto: CreatePrivilegeDto) {
    const privilege: Privilege = {
      name: dto.name,
      // action: dto.action,
      description: dto.description,
      parentId: dto.parentId,
      url: dto.url,
      orderNum: dto.orderNum,
      type: dto.type,
    };

    return this.privilegeService.createOrUpdate(privilege);
  }

  @ApiOperation({
    summary: '修改权限',
  })
  @Post('update')
  async update(@Body() dto: UpdatePrivilegeDto) {
    const { id, name, description, parentId, orderNum, type, url } = dto;
    const updatedPrivilege: Privilege = {
      name,
      // action,
      description,
      parentId,
      url,
      orderNum,
      type,
    };

    const privilege = await this.privilegeService.findById(id);

    if (!privilege) {
      throw new BusinessException(`未找到 id 为 ${id} 的权限`);
    }

    return this.privilegeService.createOrUpdate({
      ...privilege,
      ...updatedPrivilege,
    });
  }

  @ApiOperation({
    summary: '是否冻结权限',
  })
  @Post('changeStatus')
  async changeStatus(@Body() dto: DisablePrivilegeDto) {
    const found = await this.privilegeService.findById(dto.privilegeId);
    if (!found) {
      throw new BusinessException(`未找到 ID 为 ${dto.privilegeId} 的权限`);
    }
    return this.privilegeService.createOrUpdate({
      ...found,
      status: dto.status,
    });
  }

  @ApiOperation({
    summary: '删除权限',
  })
  @Post('delete')
  async delete(@Body() dto: DeletePrivilegeDto) {
    return this.privilegeService.delete(dto.privilegeId);
  }

  @ApiOperation({
    summary: '权限列表（分页）',
    description: '根据权限名称查询',
  })
  @Post('/list/pagination')
  async listWithPagination(@Body() dto: PrivilegeListWithPaginationDto) {
    const { page, ...searchParams } = dto;
    const pageData = await this.privilegeService.paginate(searchParams, page);
    const newRoles = pageData.items.map((privilege) => {
      return privilege;
    });
    return { ...pageData, items: newRoles };
  }

  @ApiOperation({
    summary: '获取所有权限',
  })
  @Post('list')
  async list() {
    return await this.privilegeService.list();
  }
}
