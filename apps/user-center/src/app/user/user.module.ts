import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '@app/common/database/database.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
