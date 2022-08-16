import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ example: '普通用户', description: '角色名称' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '普通用户的权限', description: '角色描述' })
  description: string;
}

export class DeleteRoleDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '角色id' })
  id: string;
}

export class RolePrivilegeSetDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '角色id' })
  roleId: string;

  @IsNotEmpty()
  @ApiProperty({ example: ['1'], description: '角色id' })
  privilegeIds: string[];
}

export class GetPrivilegeListByIdDto {
  @ApiProperty({ example: '85babd88-8e11-4838-b2cf-38de53ae5548' })
  @IsNotEmpty()
  roleId: string;
}

export class UpdateRoleDto extends CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '角色id' })
  id: string;
}

export class RoleListWithPaginationDto {
  @ApiProperty({ example: '' })
  keyword?: string;

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}
