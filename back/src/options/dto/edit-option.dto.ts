import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditOptionDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
