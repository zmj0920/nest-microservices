import { Page } from './page.mysql.entity';
import { PageConfig } from './pageConfig/pageConfig.mysql.entity';
import { DeployTestConfig } from './deployConfig/deployConfig.mysql.entity';

export const PageProviders = [
  {
    provide: 'PAGE_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Page),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'PAGE_CONFIG_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(PageConfig),
    inject: ['MYSQL_DATA_SOURCE'],
  },
  {
    provide: 'DEPlOY_CONFIG_REPOSITORY',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(DeployTestConfig),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
