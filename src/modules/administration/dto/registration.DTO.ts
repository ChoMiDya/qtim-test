import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegistrationDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
