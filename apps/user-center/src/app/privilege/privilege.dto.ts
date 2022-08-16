import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { PaginationParams } from "types/type";
import { Action, PrivilegeStatus } from "./privilege.mysql.entity";
export class CreatePrivilegeDto {
  @IsNotEmpty()
  @ApiProperty({ example: '查看', description: '权限名称' })
  name?: string;

  @ApiProperty({ example: '查看', description: '权限描述' })
  description?: string;

  @ApiProperty({ example: 'read', enum: Action })
  @IsNotEmpty()
  action: string;
}

export class DeletePrivilegeDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '权限ID' })
  privilegeId: string;
}

export class DisablePrivilegeDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '权限ID' })
  privilegeId: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '权限状态', enum: PrivilegeStatus })
  status: number;
}

export class UpdatePrivilegeDto extends CreatePrivilegeDto {
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '权限ID' })
  id: string;
}

export class PrivilegeListWithPaginationDto {
  @ApiProperty({ example: '', description: '查询关键词' })
  keyword?: string;

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}