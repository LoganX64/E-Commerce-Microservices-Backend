import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  customer: { name: string; phone: string };

  @Column('jsonb')
  products: { id: number; name: string; rate: number; qty: number }[];

  @Column({
    type: 'decimal',
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => Number(value) || 0,
    },
  })
  totalAmount: number;
}
