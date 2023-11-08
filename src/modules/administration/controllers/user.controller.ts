import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegistrationDTO } from '../dto/registration.DTO';
import { AllowAnonymous } from 'src/modules/authentication/allow-anonymous.decorator';

@Controller()
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Post('registration')
  @AllowAnonymous()
  async registration(@Body() input: RegistrationDTO) {
    return this.userService.registration(input);
  }
}
