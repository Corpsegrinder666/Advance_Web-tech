import { IsString, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  cost: number;

  @IsString()
  unit: string;
}
