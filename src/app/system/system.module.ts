import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { systemProviders } from './system.providers';
import { DatabaseModule } from '@/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SystemController],
  providers: [SystemService, ...systemProviders],
  exports: [SystemService],
})
export class SystemModule {}
