import { IsOptional, IsString, IsDecimal } from 'class-validator';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  @IsString()
  offers?: string;

  @IsOptional()
  @IsString()
  details?: string;
}
