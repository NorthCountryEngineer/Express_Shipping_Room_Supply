import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order_events' })
export class OrderEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.events, { onDelete: 'CASCADE' })
  order: Order;

  @Column()
  type: string;

  @Column('jsonb', { nullable: true })
  data?: any;

  @CreateDateColumn()
  createdAt: Date;
}
