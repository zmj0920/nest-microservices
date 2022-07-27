import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleProviders } from './role.providers';

@Module({
  controllers: [RoleController],
  providers: [RoleService, ...RoleProviders],
})
export class RoleModule {}
