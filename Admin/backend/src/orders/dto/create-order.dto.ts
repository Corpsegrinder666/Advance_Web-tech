import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @IsString()
  customerAddress: string;
}
