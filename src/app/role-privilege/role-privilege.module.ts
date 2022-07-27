import { Module } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';
import { RolePrivilegeController } from './role-privilege.controller';
import { rolePrivilegeProviders } from './user-privilege.providers';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RolePrivilegeController],
  providers: [RolePrivilegeService, ...rolePrivilegeProviders],
  exports: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
