import {
  UnauthorizedException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ETokenType, TTokenPayload } from './authentication.service';
import { ConfigService } from '../config/config.service';
import { dataSource } from 'src/config/typeorm';
import { UserEntity } from '../administration/entities/user.entity';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.env.AUTHENTICATION_TOKEN_SECRET,
    });
  }

  private userRepository = dataSource.getRepository(UserEntity);

  async validate(token: TTokenPayload) {
    if (token.type !== ETokenType.ACCESS) {
      throw new BadRequestException();
    }

    const user = await this.userRepository.findOne({ where: { id: token.id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
