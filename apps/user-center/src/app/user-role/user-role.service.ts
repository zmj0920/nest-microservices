import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { UserRole } from './user-role.mysql.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService,
  ) {}

  listByUserId(userId: string) {
    return this.userRoleRepository.find({
      where: {
        userId,
      },
    });
  }

  deleteByUserId(userId: string) {
    return this.userRoleRepository.delete({
      userId,
    });
  }

  async setUserRoles(userId: string, roleIds: string[]) {

    const userRoles: UserRole[] = roleIds.map((roleId) => {
      return {
        userId,
        roleId,
      };
    });
    await this.deleteByUserId(userId);
    return await this.userRoleRepository.save(userRoles);
  }

  // 获取用户角色列表
  async getRolesById(userId: string) {
    const userRoles: UserRole[] = await this.listByUserId(userId);
    const roleIds = userRoles.map((ur) => ur.roleId);
    return await this.roleService.findByIds(roleIds);
  }
}
