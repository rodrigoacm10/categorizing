import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
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
