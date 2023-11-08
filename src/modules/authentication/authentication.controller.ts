import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginInputDTO } from './dto/login-input.DTO';
import { AllowAnonymous } from './allow-anonymous.decorator';
import { ExchangeTokenInputDTO } from './dto/exchange-token-input.DTO';

@Controller()
export class AuthenticationController {
  @Inject(AuthenticationService)
  private authenticationService: AuthenticationService;

  @Post('user/login')
  @AllowAnonymous()
  async login(@Body() input: LoginInputDTO) {
    return this.authenticationService.login(input);
  }

  @Post('user/exchangeToken')
  @AllowAnonymous()
  async exchangeToken(@Body() { token }: ExchangeTokenInputDTO) {
    return this.authenticationService.exchangeToken(token);
  }
}
