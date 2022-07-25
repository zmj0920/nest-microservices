import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
