import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProjectDto } from '../../material/physical/physical.dto';
import { MATERIAL_TYPE } from '../../material/physical/physical.mysql.entity';

export class addGroupDto {
  @ApiProperty({ example: '营销组件库' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '业务线' })
  bizTitle: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  bizId: number;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  desc: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  status: number;
}

export class addMonorepoGroupDto extends CreateProjectDto {
  @ApiProperty({ example: '营销组件库' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '业务线' })
  bizTitle: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  bizId: number;

  @ApiProperty({ example: [MATERIAL_TYPE.npm], enum: MATERIAL_TYPE })
  @IsNotEmpty()
  type: MATERIAL_TYPE[];

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  desc: string;
}

export class getGroupDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
