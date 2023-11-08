import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInputDTO } from './dto/login-input.DTO';
import { UserEntity } from '../administration/entities/user.entity';
import { compare } from 'bcrypt';
import { ConfigService } from '../config/config.service';
import { dataSource } from 'src/config/typeorm';

export type TGenerateTokenUserInput = Pick<UserEntity, 'id' | 'email'>;

export enum ETokenType {
  REFRESH = 'REFRESH',
  ACCESS = 'ACCESS',
}

export type TTokenPayload = {
  id: string;
  email: string;
  expiration: string;
  type: ETokenType;
};

@Injectable()
export class AuthenticationService {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private configService: ConfigService;

  private userRepository = dataSource.getRepository(UserEntity);

  async login(input: LoginInputDTO) {
    const { email, password } = input;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new BadRequestException('incorrect email or password');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new BadRequestException('incorrect email or password');
    }

    return this.generateTokens(user);
  }

  async exchangeToken(token: string) {
    try {
      const payload: TTokenPayload = await this.jwtService.verifyAsync(token);

      if (payload.type !== ETokenType.REFRESH) {
        throw new UnauthorizedException();
      }

      return await this.generateTokens(payload);
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async generateTokens(user: TGenerateTokenUserInput) {
    const accessTokenExpiresIn =
      this.configService.env.AUTHENTICATION_TOKEN_EXPIRES_IN;
    const refreshTokenExpiresIn =
      this.configService.env.REFRESH_TOKEN_EXPIRES_IN;
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(
      {
        ...payload,
        expiration: new Date(
          Date.now() + accessTokenExpiresIn * 1000,
        ).toISOString(),
        type: ETokenType.ACCESS,
      },
      {
        expiresIn: accessTokenExpiresIn,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        ...payload,
        expiration: new Date(
          Date.now() + refreshTokenExpiresIn * 1000,
        ).toISOString(),
        type: ETokenType.REFRESH,
      },
      {
        expiresIn: refreshTokenExpiresIn,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
