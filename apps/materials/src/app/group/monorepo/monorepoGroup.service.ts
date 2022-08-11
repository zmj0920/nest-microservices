import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { MonorepoGroup } from './monorepoGroup.mysql.entity';

@Injectable()
export class MonorepoGroupService {
  constructor(
    @Inject('MONOREPO_GROUP_REPOSITORY')
    private groupRepository: Repository<MonorepoGroup>,
  ) {}

  save(group) {
    return this.groupRepository.save(group);
  }

  findOne(id) {
    return this.groupRepository.findOne(id);
  }

  getList(params) {
    return this.groupRepository.find(params);
  }

  getListByParams(params) {
    return this.groupRepository.find({ where: { ...params } });
  }

  updateOne(id, params) {
    const findMaterial = this.groupRepository.findOne(id);

    return this.groupRepository.save({ ...findMaterial, ...params });
  }

  getListByIds(ids) {
    return this.groupRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  del(id) {
    this.groupRepository.delete(id);
  }
}
