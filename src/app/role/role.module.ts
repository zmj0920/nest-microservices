import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleProviders } from './role.providers';
import { DatabaseModule } from '@/common/database/database.module';
import { RolePrivilegeModule } from '../role-privilege/role-privilege.module';
import { PrivilegeModule } from '../privilege/privilege.module';
import { SystemModule } from '../system/system.module';

@Module({
  imports: [DatabaseModule, RolePrivilegeModule, PrivilegeModule, SystemModule],
  controllers: [RoleController],
  providers: [RoleService, ...RoleProviders],
  exports: [RoleService],
})
export class RoleModule {}
