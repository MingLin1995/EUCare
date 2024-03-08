import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 建立文檔建構器
  const config = new DocumentBuilder()
    .setTitle('EUCare API')
    .setDescription('EUCare API description')
    .setVersion('1.0')
    .addTag('EUCare')
    .build();

  // 建立文檔
  const document = SwaggerModule.createDocument(app, config);

  // 設置路由
  SwaggerModule.setup('api', app, document);
  // http://localhost:3000/api-json 存成json
  // redoc-cli bundle swagger.json -o index.html


  await app.listen(3000);
}
bootstrap();
