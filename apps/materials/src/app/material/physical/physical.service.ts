import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PhysicalMaterial } from './physical.mysql.entity';

@Injectable()
export class PhysicalMaterialService {
  constructor(
    @Inject('PHYSICAL_MATERIAL_REPOSITORY')
    private physicalMaterialRepository: Repository<PhysicalMaterial>,
  ) {}

  save(PhysicalMaterial) {
    return this.physicalMaterialRepository.save(PhysicalMaterial);
  }

  findOne(id) {
    return this.physicalMaterialRepository.findOne(id);
  }

  findOneByProjectId(projectId) {
    return this.physicalMaterialRepository.findOne({
      where: {
        projectId,
      },
    });
  }

  getList(params) {
    return this.physicalMaterialRepository.find(params);
  }

  updateOne(id, params) {
    const findPhysicalMaterial = this.physicalMaterialRepository.findOne(id);

    return this.physicalMaterialRepository.save({
      ...findPhysicalMaterial,
      ...params,
    });
  }
}
