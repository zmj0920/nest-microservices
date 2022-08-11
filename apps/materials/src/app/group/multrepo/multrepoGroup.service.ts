import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { MultrepoGroup } from './multrepoGroup.mysql.entity';

@Injectable()
export class MultrepoGroupService {
  constructor(
    @Inject('MULTREPO_GROUP_REPOSITORY')
    private groupRepository: Repository<MultrepoGroup>,
  ) {}

  save(group) {
    return this.groupRepository.save(group);
  }

  getList(params) {
    return this.groupRepository.find(params);
  }

  getListByParams(params) {
    return this.groupRepository.find({ where: { ...params } });
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
