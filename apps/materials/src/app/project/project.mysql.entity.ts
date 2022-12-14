import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zhName: string;

  // 作为部署项目的前缀路径名
  @Column()
  enName: string;

  @Column({ default: null })
  desc: string;

  @Column('simple-array')
  projectTypes: string[];

  // git project fields

  @Column({ default: null })
  gitProjectId: number;

  @Column({ default: null })
  gitNamespace: string;

  @Column({ default: null })
  gitProjectUrl: string;

  @Column({ default: null })
  gitProjectName: string;

  @Column({ default: null })
  gitProjectDesc: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime?: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updateTime?: string;

  @Column()
  creatorName: string;

  @Column()
  creatorId: string;

  @Column()
  status: string;
}
