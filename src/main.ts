import { NestFactory } from '@nestjs/core';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import  {DemoPipe} from './demo.pipe'
declare const module: any; // 添加内容
function LoggerMiddleware(req, res, next) {
  console.log(req.originalUrl, '我是全局中间件LoggerMiddleware');
  next(); // 调用下一个中间件或路由处理器
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.use(LoggerMiddleware);
  app.useGlobalPipes(new DemoPipe());
  const swaggerOptions = new DocumentBuilder().setTitle('blog文档').setDescription('描述...').setVersion('1.0').build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api-docs', app, swaggerDoc);
  await app.listen(3000);
  if (module.hot) { // 添加内容
    module.hot.accept(); // 添加内容
    module.hot.dispose(() => app.close()); // 添加内容
  } // 添加内容
}
bootstrap();