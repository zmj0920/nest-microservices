import { Inject, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import {
  getPaginationOptions,
  CustomPaginationMeta,
  BusinessException,
} from '@app/common';
import { In, Repository } from 'typeorm';
import {
  CreateRoleDto,
  RoleListWithPaginationDto,
  UpdateRoleDto,
} from './role.dto';
import { Role } from './role.mysql.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY') private roleRepository: Repository<Role>,
    private readonly rolePrivilegeService: RolePrivilegeService,
  ) {}
  create(dto: CreateRoleDto) {
    const role: Role = {
      name: dto.name,
      description: dto.description,
    };
    return this.roleRepository.save(role);
  }

  update(role: Role) {
    return this.roleRepository.save(role);
  }

  async delete(id: string) {
    const foundRole = await this.findById(id);
    if (!foundRole) {
      throw new BusinessException('未找到角色');
    }
    // 同步删除角色和权限关系表
    await this.rolePrivilegeService.remove(id);
    return await this.roleRepository.delete(id);
  }

  async findById(id) {
    return await this.roleRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByIds(ids: string[]) {
    return await this.roleRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async paginate(
    searchParams: RoleListWithPaginationDto,
    page: PaginationParams,
  ): Promise<Pagination<Role, CustomPaginationMeta>> {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');
    queryBuilder.orderBy('role.createTime', 'DESC');

    // 关键字
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('role.name LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }

    return paginate<Role, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions(page),
    );
  }

  async list() {
    return await this.roleRepository.find();
  }
}
