import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteOptionDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
