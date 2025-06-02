import { IsOptional, IsString } from 'class-validator';

export class SearchCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
