import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VirtualMaterial } from './virtual.mysql.entity';

@Injectable()
export class VirtualMaterialService {
  constructor(
    @Inject('VIRTUAL_MATERIAL_REPOSITORY')
    private materialRepository: Repository<VirtualMaterial>,
  ) {}

  save(material) {
    return this.materialRepository.save(material);
  }

  findOne(id) {
    return this.materialRepository.findOne(id);
  }

  getList(params) {
    return this.materialRepository.find(params);
  }

  updateOne(id, params) {
    const findMaterial = this.materialRepository.findOne(id);

    return this.materialRepository.save({ ...findMaterial, ...params });
  }
}
