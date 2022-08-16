import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { UserRoleProviders } from './user-role.providers';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { RoleModule } from '../role/role.module';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService, ...UserRoleProviders],
  imports: [DatabaseModule, RoleModule],
  exports: [UserRoleService],
})
export class UserRoleModule {}
