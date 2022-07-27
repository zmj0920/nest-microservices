import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { UserRoleProviders } from './user-role.providers';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService, ...UserRoleProviders],
})
export class UserRoleModule {}
