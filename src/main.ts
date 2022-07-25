import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { generateDocument } from './doc';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本化管理 支持多个版本
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 设置全局接口前缀
  app.setGlobalPrefix('api');

  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 创建文档
  generateDocument(app);

  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3001);
}
bootstrap();
