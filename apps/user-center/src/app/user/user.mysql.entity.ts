import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserStatus {
  disabled = 0,
  enabled = 1,
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, default: null })
  name: string;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  email: string;

  @Column({ length: 100, default: null })
  password: string;

  @Column({ default: UserStatus.enabled })
  status?: UserStatus;

  @UpdateDateColumn()
  updateTime?: string;
}
