import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  customer: { name: string; phone: string };

  @Column('jsonb')
  products: { id: number; name: string; rate: number; qty: number }[];

  @Column('decimal')
  totalAmount: number;
}
