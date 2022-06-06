import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Refresh',
        'Resourse-Authorization',
        'Cttor-Request-Id',
        'X-App-Version',
    ],
    credentials: true,
    exposedHeaders: [
        'Content-Type',
        'Authorization',
        'Refresh',
        'Resourse-Authorization',
        'Cttor-Request-Id',
        'X-App-Version',
    ],
    origin: '*',
  });
  const options = new DocumentBuilder()
    .setTitle('CTTOR API')
    .setDescription('CTTOR API')
    .setVersion('1.0')
    .addTag('cttor')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
