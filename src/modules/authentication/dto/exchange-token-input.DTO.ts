import { IsNotEmpty, IsString } from 'class-validator';

export class ExchangeTokenInputDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}
