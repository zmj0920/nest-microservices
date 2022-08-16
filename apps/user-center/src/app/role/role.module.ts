import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from '@app/common';
import { RoleProviders } from './role.providers';
import { RolePrivilegeModule } from '../role-privilege/role-privilege.module';
import { PrivilegeModule } from '../privilege/privilege.module';

@Module({
  imports: [DatabaseModule, RolePrivilegeModule, PrivilegeModule],
  providers: [RoleService, ...RoleProviders],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
