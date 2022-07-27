import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { systemProviders } from './system.providers';

@Module({
  controllers: [SystemController],
  providers: [SystemService, ...systemProviders],
})
export class SystemModule {}
