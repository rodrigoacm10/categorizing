import { IsOptional, IsString } from 'class-validator';

export class SearchItemDto {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  optionId?: string;
}
