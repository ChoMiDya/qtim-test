import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config/environment.config';
import { AdministrationModule } from '../administration/administration.module';
import { ConfigModule } from '../config/config.module';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationStrategy } from './authentication.strategy';

@Module({
  imports: [
    AdministrationModule,
    JwtModule.register({
      secret: config.AUTHENTICATION_TOKEN_SECRET,
      signOptions: {
        expiresIn: config.AUTHENTICATION_TOKEN_EXPIRES_IN,
      },
    }),
    ConfigModule,
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    AuthenticationStrategy,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationGuard],
})
export class AuthenticationModule {}
