import { IsUUID } from 'class-validator';

export class DeleteNewsInputDTO {
  @IsUUID('4')
  id: string;
}
