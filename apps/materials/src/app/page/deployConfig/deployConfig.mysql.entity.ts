import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class DeployTestConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  contain: string;

  @CreateDateColumn()
  createTime: string;

  @Column()
  pageId: string;
}
