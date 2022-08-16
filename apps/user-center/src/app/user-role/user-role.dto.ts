import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetRolesByIdDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @ApiProperty({
    example: 'ab68a98b-70ed-4caa-9803-167905210182',
    description: '用户ID',
  })
  userId: string;
}

export class SetRolesDto {
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '用户ID' })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ example: [1], description: '角色ID' })
  roleIds: string[];
}
