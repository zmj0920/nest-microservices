import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PageConfig } from './pageConfig.mysql.entity';

@Injectable()
export class PageConfigService {
  constructor(
    @Inject('PAGE_CONFIG_REPOSITORY')
    private pageConfigRepository: Repository<PageConfig>,
  ) {}

  create(createPageConfigDto) {
    return this.pageConfigRepository.save(createPageConfigDto);
  }

  findByPageId(pageId) {
    return this.pageConfigRepository.find({
      where: {
        pageId,
      },
    });
  }

  findOne(id) {
    return this.pageConfigRepository.findOne(id);
  }

  // update(id: number, updatePageConfigDto) {
  //   return `This action updates a #${id} pageConfig`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pageConfig`;
  // }
}
