import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveNewsInputDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  header?: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
