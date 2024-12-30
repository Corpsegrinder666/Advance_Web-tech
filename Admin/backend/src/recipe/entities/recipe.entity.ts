import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  type: string; // e.g., "single", "family", "event"

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  offers: string; // Any special offers

  @Column('text')
  details: string; // Detailed description of the recipe
}
