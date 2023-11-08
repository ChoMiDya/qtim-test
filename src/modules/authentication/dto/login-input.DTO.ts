import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
