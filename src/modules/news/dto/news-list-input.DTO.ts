import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { IsDateString } from 'src/common/validation/decorators/is-date-string';

export class NewsListInputDTO {
  @IsInt()
  @IsOptional()
  skip: number | undefined;

  @IsInt()
  @IsOptional()
  take: number | undefined;

  @IsUUID('4')
  @IsOptional()
  authorId: string | undefined;

  @IsDateString()
  @IsOptional()
  date: string | undefined;
}
