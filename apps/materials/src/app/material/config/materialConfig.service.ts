import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MaterialConfig } from './materialConfig.mysql.entity';

@Injectable()
export class MaterialConfigService {
  constructor(
    @Inject('MATERIAL_CONFIG_REPOSITORY')
    private materialConfigServer: Repository<MaterialConfig>,
  ) {}

  save(materialConfig) {
    return this.materialConfigServer.save(materialConfig);
  }

  getList(params) {
    return this.materialConfigServer.find(params);
  }

  findOne(id) {
    return this.materialConfigServer.findOne(id);
  }
}
