import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { ResourceProviders } from './resource.providers';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService, ...ResourceProviders],
})
export class ResourceModule {}
