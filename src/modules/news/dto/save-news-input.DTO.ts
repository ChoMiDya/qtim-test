import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveNewsInputDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  header: string | undefined;

  @IsString()
  @IsNotEmpty()
  body: string;
}
