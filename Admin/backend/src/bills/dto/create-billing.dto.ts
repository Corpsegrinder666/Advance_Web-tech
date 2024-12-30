import { IsString, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEnum(['Daily', 'Weekly', 'Monthly'])
  billingCycle: 'Daily' | 'Weekly' | 'Monthly';

  @IsEnum(['Cash', 'Delivery', 'Nagad', 'Bkash'])
  paymentMethod: 'Cash' | 'Delivery' | 'Nagad' | 'Bkash';

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
