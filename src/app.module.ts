import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import EnvConfig from './config/environment.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      envFilePath: '../.env',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
