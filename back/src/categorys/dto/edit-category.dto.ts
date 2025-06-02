import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
