import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RolePrivilege {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  roleId: string;

  @Column()
  privilegeId: string;
}
