import { Module } from '@nestjs/common';
import { DatabaseModule, getConfig } from '@app/common';
import { PageController } from './page.controller';
import { PageProviders } from './page.providers';
import { PageService } from './page.service';

import { PageConfigService } from './pageConfig/pageConfig.service';
import { PageConfigController } from './pageConfig/pageConfig.controller';
import { DeployConfigService } from './deployConfig/deployConfig.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const { USER_MICROSERVICES } = getConfig();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.TCP,
        options: USER_MICROSERVICES,
      },
    ]),
    DatabaseModule,
  ],
  controllers: [PageConfigController, PageController],
  providers: [
    PageConfigService,
    PageService,
    DeployConfigService,
    ...PageProviders,
  ],
  exports: [PageService, DeployConfigService],
})
export class PageModule {}
