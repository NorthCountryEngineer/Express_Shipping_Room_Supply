import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orders: Repository<Order>,
    @InjectRepository(OrderItem) private items: Repository<OrderItem>,
    @Inject('KAFKA_CLIENT') private readonly kafka: ClientKafka,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orders.find({ relations: ['items', 'state', 'events'] });
  }

  async findOne(id: string): Promise<Order> {
    return this.orders.findOneOrFail({
      where: { id },
      relations: ['items','state','events'],
    });
  }

  async create(order: Partial<Order>): Promise<Order> {
    const created = await this.orders.save(this.orders.create(order));
    const payload = { orderId: created.id, items: created.items };
    this.kafka.emit('OrderCreated', payload);
    return created;
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    await this.orders.update(id, order);
    return this.orders.findOneOrFail({
      where: { id },
      relations: ['items','state','events'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.orders.delete(id);
  }

  async createItem(item: Partial<OrderItem>): Promise<OrderItem> {
    return this.items.save(this.items.create(item));
  }

  async updateItem(id: string,item: Partial<OrderItem>,): Promise<OrderItem> {
    await this.items.update(id, item);
    return this.items.findOneOrFail({ where: { id }, relations: ['order'] });
  }

  async findAllItems(): Promise<OrderItem[]> {
    return this.items.find({ relations: ['order'] });
  }

  async findItem(id: string): Promise<OrderItem> {
    return this.items.findOneOrFail({ where:{id}, relations:['order'] });
  }

  async removeItem(id: string): Promise<void> {
    await this.items.delete(id);
  }
}
