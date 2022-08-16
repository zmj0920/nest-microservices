import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify from 'fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import fastifyCookie from '@fastify/cookie';
import { UserCenterModule } from './app.module';
import {
  FastifyLogger,
  catchError,
  AllExceptionsFilter,
  HttpExceptionFilter,
  generateDocument,
} from '@app/common';

import * as cookieParser from 'cookie-parser';
import { WsAdapter } from '@app/common/ws/ws.adapter';

declare const module: any;

catchError();

async function bootstrap() {
  // 初始化 fastify
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });

  // 创建 NEST 实例
  const app = await NestFactory.create<NestFastifyApplication>(
    UserCenterModule,
    new FastifyAdapter(fastifyInstance),
  );
  // app.enableCors({
  //   allowedHeaders: ['content-type'],
  //   origin: 'http://localhost:4201',
  //   credentials: true,
  // });

  // 接口版本化管理 支持多个版本
  // defaultVersion: [VERSION_NEUTRAL, '1', '2'],

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // micro serivce
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: 4100,
        host: '0.0.0.0',
      },
    },
    {
      inheritAppConfig: true, // 继承 app 配置
    },
  );

  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  // 格式化 cookie
  app.use(cookieParser());

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 设置全局接口前缀
  app.setGlobalPrefix('api');

  // 统一响应体格式
  // app.useGlobalInterceptors(new TransformInterceptor());

  //ws
  app.useWebSocketAdapter(new WsAdapter(app));

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  // 创建文档
  generateDocument(app, '用户中心系统');

  // 启动所有微服务
  await app.startAllMicroservices();

  // 启动服务
  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
