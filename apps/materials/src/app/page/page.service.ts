import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Page } from './page.mysql.entity';
import { STATUS_TYPE } from './page.mysql.entity';

@Injectable()
export class PageService {
  constructor(
    @Inject('PAGE_REPOSITORY')
    private pageRepository: Repository<Page>,
  ) {}

  saveAndUpdate(page) {
    return this.pageRepository.save(page);
  }

  findOne(id) {
    return this.pageRepository.findOne(id);
  }

  findAll() {
    return this.pageRepository.find();
  }

  findOneByQuery(params) {
    return this.pageRepository.findOne({
      where: {
        ...params,
      },
    });
  }

  updateOne(id, page) {
    const findPage = this.pageRepository.findOne(id);

    return this.pageRepository.save({ ...findPage, ...page });
  }
}
