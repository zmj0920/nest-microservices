import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'root' })
  username: string;

  @ApiProperty({ example: 'admin' })
  password: string;
}
