import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthenticationService,
  TAuthenticationToken,
} from './authentication.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthenticationService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.env.AUTHENTICATION_TOKEN_SECRET,
    });
  }

  async validate(token: TAuthenticationToken) {
    const user = await this.authService.validateToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
