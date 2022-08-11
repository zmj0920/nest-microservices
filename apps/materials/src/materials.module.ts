import { Module } from '@nestjs/common';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { TransformInterceptor, getConfig, JwtAuthGuard } from '@app/common';
import { GroupModule } from './app/group/group.module';
import { MaterialModule } from './app/material/material.module';
import { ProjectModule } from './app/project/project.module';
import { TaskModule } from './app/task/task.module';
import { MicroservicesModule } from './app/microservices/microservices.module';
import { PermissionGuard } from './app/auth/guards/permission.guard';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    MicroservicesModule,
    GroupModule,
    TaskModule,
    MaterialModule,
    ProjectModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class MaterialsModule {}
