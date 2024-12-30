import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string; // e.g., "Vegetable", "Spices", "Oil"

  @Column('float')
  quantity: number; // Quantity available

  @Column('float')
  cost: number; // Cost per unit

  @Column()
  unit: string; // e.g., "kg", "liters", "grams"
}
