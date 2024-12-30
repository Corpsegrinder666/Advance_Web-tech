import { IsOptional, IsEnum, IsNumber } from 'class-validator';

export class UpdateBillingDto {
  @IsOptional()
  @IsEnum(['Paid', 'Not Paid'])
  paymentStatus?: 'Paid' | 'Not Paid';

  @IsOptional()
  @IsNumber()
  amount?: number;
}
