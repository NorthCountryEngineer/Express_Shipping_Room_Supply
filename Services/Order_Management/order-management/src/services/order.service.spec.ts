import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

type MockRepository = {
  create: jest.Mock;
  save: jest.Mock;
  find: jest.Mock;
  findOne: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
};

const createMockRepository = (): MockRepository => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('OrderService', () => {
  let service: OrderService;
  let ordersRepo: MockRepository;
  let itemsRepo: MockRepository;
  let kafkaClient: { emit: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useFactory: createMockRepository,
        },
        {
          provide: getRepositoryToken(OrderItem),
          useFactory: createMockRepository,
        },
        { provide: 'KAFKA_CLIENT', useValue: { emit: jest.fn() } },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    ordersRepo = module.get(getRepositoryToken(Order));
    itemsRepo = module.get(getRepositoryToken(OrderItem));
    kafkaClient = module.get('KAFKA_CLIENT');
  });

  describe('orders', () => {
    it('should create an order and emit an event', async () => {
      const order: Order = {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [],
        events: [],
      } as Order;
      ordersRepo.save.mockResolvedValue(order);

      await expect(service.create(order)).resolves.toEqual(order);
      expect(ordersRepo.create).toHaveBeenCalledWith(order);
      expect(kafkaClient.emit).toHaveBeenCalledWith('OrderCreated', {
        orderId: '1',
        items: [],
      });
    });

    it('should find all orders', async () => {
      const result = [] as Order[];
      ordersRepo.find.mockResolvedValue(result);

      await expect(service.findAll()).resolves.toBe(result);
      expect(ordersRepo.find).toHaveBeenCalledWith({
        relations: ['items', 'state', 'events'],
      });
    });

    it('should find one order', async () => {
      const order = { id: '1' } as Order;
      ordersRepo.findOne.mockResolvedValue(order);

      await expect(service.findOne('1')).resolves.toBe(order);
      expect(ordersRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['items', 'state', 'events'],
      });
    });

    it('should update an order and return the updated value', async () => {
      const order = { id: '1' } as Order;
      ordersRepo.findOne.mockResolvedValue(order);

      await expect(
        service.update('1', { id: '1' } as Partial<Order>),
      ).resolves.toBe(order);
      expect(ordersRepo.update).toHaveBeenCalledWith('1', { id: '1' });
    });

    it('should remove an order', async () => {
      ordersRepo.delete.mockResolvedValue(undefined);

      await expect(service.remove('1')).resolves.toBeUndefined();
      expect(ordersRepo.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('order items', () => {
    it('should create an item', async () => {
      const item: OrderItem = {
        id: '1',
        productId: 'p1',
        quantity: 1,
        order: {} as Order,
      };
      itemsRepo.save.mockResolvedValue(item);

      await expect(service.createItem(item)).resolves.toBe(item);
      expect(itemsRepo.create).toHaveBeenCalledWith(item);
    });

    it('should find all items', async () => {
      const result = [] as OrderItem[];
      itemsRepo.find.mockResolvedValue(result);

      await expect(service.findAllItems()).resolves.toBe(result);
      expect(itemsRepo.find).toHaveBeenCalledWith({ relations: ['order'] });
    });

    it('should find one item', async () => {
      const item = {
        id: '1',
        productId: 'p1',
        quantity: 1,
        order: {} as Order,
      } as OrderItem;
      itemsRepo.findOne.mockResolvedValue(item);

      await expect(service.findItem('1')).resolves.toBe(item);
      expect(itemsRepo.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['order'],
      });
    });

    it('should update an item', async () => {
      const item: OrderItem = {
        id: '1',
        productId: 'p1',
        quantity: 1,
        order: {} as Order,
      };
      itemsRepo.findOne.mockResolvedValue(item);

      await expect(service.updateItem('1', { quantity: 2 })).resolves.toBe(
        item,
      );
      expect(itemsRepo.update).toHaveBeenCalledWith('1', { quantity: 2 });
    });

    it('should remove an item', async () => {
      itemsRepo.delete.mockResolvedValue(undefined);

      await expect(service.removeItem('1')).resolves.toBeUndefined();
      expect(itemsRepo.delete).toHaveBeenCalledWith('1');
    });
  });
});
