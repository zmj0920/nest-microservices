import { Module } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeProviders } from './privilege.providers';

@Module({
  controllers: [PrivilegeController],
  providers: [PrivilegeService, ...PrivilegeProviders],
})
export class PrivilegeModule {}
