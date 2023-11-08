import 'source-map-support/register';
import { config } from './config/environment.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './config/typeorm';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await dataSource.initialize();
  await app.listen(Number(config.APP_PORT), String(config.APP_HOST));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
