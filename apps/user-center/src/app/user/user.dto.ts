import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';
import { UserStatus } from './user.mysql.entity';

export class CreateUserDto {
  @ApiProperty({ example: '君吟' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '506499594@qq.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'root' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'root' })
  username: string;

  @ApiProperty({ example: 'admin' })
  password: string;
}

export class UserListWithPaginationDto {
  @ApiProperty({ example: '', description: '查询关键词' })
  keyword?: string;

  @ApiProperty({ example: { pageSize: 10, currentPage: 1 } })
  page?: PaginationParams;
}

export class DisableUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'ab68a98b-70ed-4caa-9803-167905210182',
    description: '用户ID',
  })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '用户状态', enum: UserStatus })
  status: number;
}

export class DeleteUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'ab68a98b-70ed-4caa-9803-167905210182',
    description: '用户ID',
  })
  id: string;
}
