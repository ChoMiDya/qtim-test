import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import EnvConfig from './config/environment.config';
import { ConfigModule } from '@nestjs/config';
import { AdministrationModule } from './modules/administration/administration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      envFilePath: '../.env',
    }),
    AdministrationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
