import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule, AuthModule } from '@app/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [AuthModule, forwardRef(() => DatabaseModule)],
  controllers: [UserController],
  providers: [...UserProviders, UserService, LocalStrategy],
  exports: [UserService],
})
export class UserModule {}
