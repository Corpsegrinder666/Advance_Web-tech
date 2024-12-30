import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerAddress: string;

  @Column()
  status: string; // "Pending", "Accepted", "Rejected", "Assigned"

  @Column({ nullable: true })
  rejectionReason?: string; // Reason for rejection

  @Column({ nullable: true })
  assignedTo?: string; // Placeholder for assigned person or role
}
