// 配置文档 https://docs.nestjs.cn/?p=/8/recipes&q=id=swagger
// https://blog.csdn.net/weixin_44828005/article/details/116136244

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../../../../package.json';

export const generateDocument = (app, title = packageConfig.name) => {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .addBasicAuth() //鉴权，可以输入token
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/doc', app, document);
};
