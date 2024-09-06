/* eslint-disable prettier/prettier */
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log("================Application is starting================");
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  const config = new DocumentBuilder()
    .setTitle('Ngedrup')
    .setDescription('The Ngedrup API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`================Application has started================`);
} 
bootstrap();
