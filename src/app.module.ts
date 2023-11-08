import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import EnvConfig from './config/environment.config';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AdministrationModule } from './modules/administration/administration.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [EnvConfig],
      envFilePath: '../.env',
    }),
    AdministrationModule,
    AuthenticationModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
