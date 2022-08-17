import { getConfig, JwtAuthGuard, TransformInterceptor } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PrivilegeModule } from './app/privilege/privilege.module';
import { RolePrivilegeModule } from './app/role-privilege/role-privilege.module';
import { RoleModule } from './app/role/role.module';
import { UserRoleModule } from './app/user-role/user-role.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
    RolePrivilegeModule,
    UserRoleModule,
    RoleModule,
    PrivilegeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class UserCenterModule {}
