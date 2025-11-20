import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let repo: any;

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repo = module.get(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TEST: Should create order
  it('should create and save an order', async () => {
    const dto = {
      customer: { name: 'John Doe', phone: '1234567890' },
      products: [{ id: 1, name: 'book', rate: 10, qty: 2 }],
      totalAmount: 20,
    };
    const orderEntity = { id: 1, ...dto };

    repo.create.mockReturnValue(dto);
    repo.save.mockResolvedValue(orderEntity);

    const result = await service.create(dto);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual(orderEntity);
  });

  // TEST: Should return all orders
  it('should return all orders', async () => {
    const orders = [{ id: 1 }];
    repo.find.mockResolvedValue(orders);

    expect(await service.findAll()).toEqual(orders);
  });

  it('should return one order', async () => {
    const order = { id: 1 };
    repo.findOneBy.mockResolvedValue(order);

    expect(await service.findOne(1)).toEqual(order);
  });
});
