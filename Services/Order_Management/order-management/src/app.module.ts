import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  OrdersController,
  OrderItemsController,
} from './controllers/orders.controller';
import { InventoryEventsController } from './controllers/inventory-events.controller';
import { OrderService } from './services/order.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderState } from './entities/order-state.entity';
import { OrderEvent } from './entities/order-event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Order, OrderItem, OrderState, OrderEvent],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, OrderItem, OrderState, OrderEvent]),
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-management',
            brokers: (
              process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092'
            ).split(','),
          },
          consumer: {
            groupId: 'order-management',
          },
        },
      },
    ]),
  ],
  controllers: [
    OrdersController,
    OrderItemsController,
    InventoryEventsController,
  ],
  providers: [OrderService],
})
export class AppModule {}
