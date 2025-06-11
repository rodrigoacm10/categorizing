import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class EditNameItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
