import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
