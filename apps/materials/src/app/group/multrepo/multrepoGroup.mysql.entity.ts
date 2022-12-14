import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MultrepoGroup {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  desc: string;

  @Column()
  creatorName: string;

  @Column()
  creatorId: string;

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;

  @Column()
  status: number;
}
