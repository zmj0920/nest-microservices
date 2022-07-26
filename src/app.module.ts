import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UserModule } from './app/user/user.module';
import { WsModule } from './common/ws/ws.module';
import { getConfig } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    UserModule,
    WsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
