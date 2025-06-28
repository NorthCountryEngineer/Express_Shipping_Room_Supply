import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderState } from './order-state.entity';
import { OrderEvent } from './order-event.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @ManyToOne(() => OrderState, (state) => state.orders, { nullable: true })
  state?: OrderState;

  @OneToMany(() => OrderEvent, (event) => event.order, { cascade: true })
  events: OrderEvent[];
}
