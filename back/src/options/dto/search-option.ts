import { IsOptional, IsString } from 'class-validator';

export class SearchOptionDto {
  @IsString()
  @IsOptional()
  categoryId?: string;
}
