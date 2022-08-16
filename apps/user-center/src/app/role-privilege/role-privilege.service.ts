import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { RolePrivilege } from './role-privilege.mysql.entity';

@Injectable()
export class RolePrivilegeService {
  constructor(
    @Inject('ROLE_PRIVILEGE_REPOSITORY')
    private rolePrivilegeRepository: Repository<RolePrivilege>,
  ) {}

  listByRoleIds(roleIds: string[]) {
    return this.rolePrivilegeRepository.find({
      where: {
        roleId: In(roleIds),
      },
    });
  }

  remove(roleId: string) {
    return this.rolePrivilegeRepository.delete({
      roleId,
    });
  }

  set(roleId: string, privilegeIds: string[]) {
    const rolePrivileges: RolePrivilege[] = privilegeIds.map((privilegeId) => {
      return {
        roleId,
        privilegeId,
      };
    });
    return this.rolePrivilegeRepository.save(rolePrivileges);
  }
}
