import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { IsDateString } from 'src/common/validation/decorators/is-date-string';

export class NewsListInputDTO {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  take?: number;

  @IsUUID('4')
  @IsOptional()
  authorId?: string;

  @IsDateString()
  @IsOptional()
  date?: string;
}
