import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PrivilegeStatus {
  DENY = 0,
  ALLOW = 1,
  NOT_SET = 2,
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Entity()
export class Privilege {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ type: 'text', default: null })
  description?: string;

  // @Column()
  // action: string;

  @Column({ default: PrivilegeStatus.ALLOW })
  status?: PrivilegeStatus;

  @CreateDateColumn()
  createTime?: string;

  @Column()
  parentId: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  orderNum: number;

  @Column({ type: 'int', comment: '菜单类型， 1-菜单/目录 2-tabs 3-按钮' })
  type: 1 | 2 | 3;
}

