import { IsString, IsNotEmpty, IsOptional, IsDecimal } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsString()
  offers?: string;

  @IsNotEmpty()
  @IsString()
  details: string;
}
