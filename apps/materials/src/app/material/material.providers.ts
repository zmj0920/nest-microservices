import { MaterialConfig } from './config/materialConfig.mysql.entity';
import { PhysicalMaterial } from './physical/physical.mysql.entity';
import { VirtualMaterial } from './virtual/virtual.mysql.entity';

export const MaterialProviders = [
  {
    provide: 'PHYSICAL_MATERIAL_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(PhysicalMaterial),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'VIRTUAL_MATERIAL_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(VirtualMaterial),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'MATERIAL_CONFIG_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(MaterialConfig),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
