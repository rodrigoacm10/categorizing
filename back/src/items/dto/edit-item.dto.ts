import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class EditItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  categoryIds: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  optionIds: string[];
}
