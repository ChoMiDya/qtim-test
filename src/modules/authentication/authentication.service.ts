import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.DTO';
import { UserEntity } from '../administration/entities/user.entity';
import { UserService } from '../administration/services/user.service';
import { compare } from 'bcrypt';
import { ConfigService } from '../config/config.service';

export type TGenerateTokenUserInput = Pick<UserEntity, 'id' | 'email'>;

export type TAuthenticationToken = {
  id: string;
  email: string;
  expiration: string;
};

@Injectable()
export class AuthenticationService {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private usersService: UserService;

  @Inject()
  private configService: ConfigService;

  async login(input: LoginDTO) {
    const { email, password } = input;
    const userRepository = this.usersService.getRepository();

    const user = await userRepository.findOne({
      where: { email },
      select: {
        password: true,
      },
    });

    if (!user) {
      return null;
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      return null;
    }

    return this.generateToken(
      user,
      this.configService.env.AUTHENTICATION_TOKEN_EXPIRES_IN,
    );
  }

  async exchangeToken(user: TGenerateTokenUserInput) {
    return this.generateToken(
      user,
      this.configService.env.REFRESH_TOKEN_EXPIRES_IN,
    );
  }

  private async generateToken(
    user: TGenerateTokenUserInput,
    expiresIn: number,
  ) {
    const expiration = new Date(Date.now() + expiresIn * 1000);
    const expirationString = expiration.toISOString();
    const payload = {
      id: user.id,
      email: user.email,
      expiration: expirationString,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async validateToken(token: TAuthenticationToken): Promise<UserEntity | null> {
    const user = await this.usersService.findOneWhere({ id: token.id });

    return user ?? null;
  }
}
