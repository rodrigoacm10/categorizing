import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class EditQuantityItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
