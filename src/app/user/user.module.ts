import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';

import { DatabaseModule } from '@/common/database/database.module';
import { RolePrivilegeModule } from '../role-privilege/role-privilege.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { RoleModule } from '../role/role.module';
import { PrivilegeModule } from '../privilege/privilege.module';
import { FeishuService } from './feishu/feishu.service';
import * as redisStore from 'cache-manager-redis-store';
import { getConfig } from '@/utils';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db,
    }),
    RolePrivilegeModule,
    UserRoleModule,
    RoleModule,
    PrivilegeModule
  ],
  controllers: [UserController],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService, FeishuService],
})

export class UserModule { }