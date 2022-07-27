import { Module } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';
import { RolePrivilegeController } from './role-privilege.controller';
import { rolePrivilegeProviders } from './user-privilege.providers';

@Module({
  controllers: [RolePrivilegeController],
  providers: [RolePrivilegeService, ...rolePrivilegeProviders],
})
export class RolePrivilegeModule {}
