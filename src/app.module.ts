import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { getConfig } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
