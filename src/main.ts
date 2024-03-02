import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth() //使用Swagger来测试传递bearer token接口
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // visit http://localhost:4000/docs to view document
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
}
bootstrap();


