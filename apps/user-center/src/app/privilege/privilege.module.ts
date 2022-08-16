import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeProviders } from './privilege.providers';
import { PrivilegeService } from './privilege.service';

@Module({
  controllers: [PrivilegeController],
  providers: [PrivilegeService, ...PrivilegeProviders],
  imports: [DatabaseModule],
  exports: [PrivilegeService],
})
export class PrivilegeModule {}
