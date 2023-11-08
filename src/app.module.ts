import { Module } from '@nestjs/common';
import EnvConfig from './config/environment.config';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AdministrationModule } from './modules/administration/administration.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ConfigModule } from './modules/config/config.module';
import { AuthenticationGuard } from './modules/authentication/authentication.guard';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [EnvConfig],
      envFilePath: '../.env',
    }),
    AdministrationModule,
    AuthenticationModule,
    ConfigModule,
    NewsModule,
  ],
  controllers: [],
  providers: [
    { provide: 'AuthenticationGuard', useClass: AuthenticationGuard },
  ],
})
export class AppModule {}
