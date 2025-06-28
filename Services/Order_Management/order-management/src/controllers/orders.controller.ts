import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Order>): Promise<Order> {
    return this.service.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Order>,
  ): Promise<Order> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly service: OrderService) {}

  @Get()
  findAll(): Promise<OrderItem[]> {
    return this.service.findAllItems();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrderItem> {
    return this.service.findItem(id);
  }

  @Post()
  create(@Body() data: Partial<OrderItem>): Promise<OrderItem> {
    return this.service.createItem(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<OrderItem>,
  ): Promise<OrderItem> {
    return this.service.updateItem(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.removeItem(id);
  }
}
