import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from './dto/login.DTO';
import { UserEntity } from '../administration/entities/user.entity';
import { AllowAnonymous } from './allow-anonymous.decorator';

export type TRequest = Request & {
  user: Omit<UserEntity, 'password'>;
};

@Controller()
export class AuthenticationController {
  @Inject(AuthenticationService)
  private authenticationService: AuthenticationService;

  @Post('user/login')
  @AllowAnonymous()
  async login(@Body() input: LoginDTO) {
    const result = await this.authenticationService.login(input);

    if (!result) {
      throw new BadRequestException('incorrect email or password');
    }

    return result;
  }

  @Post('user/exchangeToken')
  @AllowAnonymous()
  async exchangeToken(@Req() req: TRequest) {
    const result = await this.authenticationService.exchangeToken(req.user);

    if (!result) {
      throw new BadRequestException('incorrect email or password');
    }

    return result;
  }
}
