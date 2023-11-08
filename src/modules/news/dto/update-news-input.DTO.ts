import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateNewsInputDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  header: string | undefined;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  body: string;
}
