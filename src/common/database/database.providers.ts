import { DataSource } from 'typeorm';

import { getConfig } from '@/utils/index';
import { NamingStrategy } from './naming.strategies';
import { User } from '@/app/user/user.mysql.entity';
import { Privilege } from '@/app/privilege/privilege.mysql.entity';
import { Resource } from '@/app/resource/resource.mysql.entity';
import { Role } from '@/app/role/role.mysql.entity';
import { RolePrivilege } from '@/app/role-privilege/role-privilege.mysql.entity';
import { System } from '@/app/system/system.mysql.entity';
import { UserRole } from '@/app/user-role/user-role.mysql.entity';

const { MYSQL_CONFIG } = getConfig();

// 静态文件处理与 webpack hmr 热更新冲突
const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  NamedNodeMap: new NamingStrategy(),
  entities: [Privilege, Resource, Role, RolePrivilege, System, User, UserRole]
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
