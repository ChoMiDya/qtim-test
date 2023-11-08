import 'source-map-support/register';
import { config } from './config/environment.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './config/typeorm';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(app.get('AuthenticationGuard'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await dataSource.initialize();
  await app.listen(Number(config.APP_PORT), String(config.APP_HOST));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
