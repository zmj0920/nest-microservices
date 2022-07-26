import { DataSource } from 'typeorm';

import { getConfig } from '@/utils/index';
import { NamingStrategy } from './naming.strategies';
import { User } from '@/app/user/entities/user.entity';

const { MYSQL_CONFIG } = getConfig();

// 静态文件处理与 webpack hmr 热更新冲突
const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  NamedNodeMap: new NamingStrategy(),
  entities: [User]
};

const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);

// console.log('MYSQL_DATA_SOURCE===>', MYSQL_DATA_SOURCE);

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      if (!MYSQL_DATA_SOURCE.isInitialized)
        await MYSQL_DATA_SOURCE.initialize();
      return MYSQL_DATA_SOURCE;
    },
  },
];
