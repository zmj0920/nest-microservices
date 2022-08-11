import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
