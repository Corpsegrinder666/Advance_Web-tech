import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('billing')
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  billingCycle: 'Daily' | 'Weekly' | 'Monthly';

  @Column({ default: 'Not Paid' })
  paymentStatus: 'Paid' | 'Not Paid';

  @Column()
  paymentMethod: 'Cash' | 'Delivery' | 'Nagad' | 'Bkash';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
