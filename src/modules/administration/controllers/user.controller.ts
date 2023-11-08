import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegistrationDTO } from '../dto/registration.DTO';

@Controller()
export class UserController {
  @Inject(UserService)
  private userService: UserService;

  @Post('registration')
  async registration(@Body() input: RegistrationDTO) {
    return this.userService.registration(input);
  }
}
