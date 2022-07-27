import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { UserRoleProviders } from './user-role.providers';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserRoleController],
  providers: [UserRoleService, ...UserRoleProviders],
  exports: [UserRoleService],
})
export class UserRoleModule {}
