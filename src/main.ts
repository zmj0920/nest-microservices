import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { generateDocument } from './doc';
import { WsAdapter } from './common/ws/ws.adapter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyLogger } from './common/logger';
import fastify from 'fastify';
declare const module: any;
async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger,
    // logger: true
  })

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );

  // 接口版本化管理 支持多个版本
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 设置全局接口前缀
  app.setGlobalPrefix('api');

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  //ws
  app.useWebSocketAdapter(new WsAdapter());

  // 创建文档
  generateDocument(app);

  // 启动全局字段校验，保证请求接口字段校验正确。
  app.useGlobalPipes(new ValidationPipe());

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3001);
}
bootstrap();
