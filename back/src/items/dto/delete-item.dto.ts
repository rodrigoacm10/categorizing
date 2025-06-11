import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
