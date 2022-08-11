import { CodeGroup } from './code/code.mysql.entity';
import { MonorepoGroup } from './monorepo/monorepoGroup.mysql.entity';
import { MultrepoGroup } from './multrepo/multrepoGroup.mysql.entity';

export const GroupProviders = [
  {
    provide: 'MULTREPO_GROUP_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(MultrepoGroup),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'MONOREPO_GROUP_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(MonorepoGroup),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'CODE_GROUP_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(CodeGroup),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
