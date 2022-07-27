import { Module } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeProviders } from './privilege.providers';
import { DatabaseModule } from '@/common/database/database.module';
import { SystemModule } from '../system/system.module';
import { ResourceModule } from '../resource/resource.module';

@Module({
  imports: [DatabaseModule, SystemModule, ResourceModule],
  controllers: [PrivilegeController],
  providers: [PrivilegeService, ...PrivilegeProviders],
  exports: [PrivilegeService],
})
export class PrivilegeModule {}
