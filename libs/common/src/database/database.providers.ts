/*
 * @Description: 数据库链接配置
 */

import { DataSource } from 'typeorm';

import { getConfig } from '../utils/index';
import { NamingStrategy } from './naming.strategies';

import * as path from 'path';

const { MYSQL_CONFIG } = getConfig();

const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  NamedNodeMap: new NamingStrategy(),
  entities: [
    path.join(
      __dirname,
      `../../../../**/*.${MYSQL_CONFIG.entities}.entity{.ts,.js}`,
    ),
  ],
  // entities: [Privilege, Resource, Role, RolePrivilege, System, User, UserRole]
};

const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);
console.log(MYSQL_DATA_SOURCE);


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
