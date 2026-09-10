import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { of } from 'rxjs';
import { CreateOrderDto } from '../shared/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let mockGrpcService: any;

  beforeEach(async () => {
    mockGrpcService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      createOrder: jest.fn(),
    };

    const mockClientGrpc = {
      getService: jest.fn().mockReturnValue(mockGrpcService),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: 'ORDERS_SERVICE',
          useValue: mockClientGrpc,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    controller.onModuleInit();
  });

  it('should return all orders', async () => {
    const data = [{ id: 1 }];
    mockGrpcService.findAll.mockReturnValue(of({ orders: data }));

    const result = await controller.findAll().toPromise();
    expect(result).toEqual(data);
    expect(mockGrpcService.findAll).toHaveBeenCalledWith({});
  });

  it('should return an order by id', async () => {
    const data = { id: 1 };
    mockGrpcService.findOne.mockReturnValue(of(data));

    const result = await controller.findOne('1').toPromise();

    expect(result).toEqual(data);
    expect(mockGrpcService.findOne).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create an order', async () => {
    const dto: CreateOrderDto = {
      customer: { name: 'John', phone: '1234567890' },
      products: [{ id: 1, name: 'Book', rate: 10, qty: 1 }],
      totalAmount: 10,
    };

    const resultData = { id: 1, ...dto };
    mockGrpcService.createOrder.mockReturnValue(of(resultData));

    const result = await controller.create(dto).toPromise();

    expect(result).toEqual(resultData);
    expect(mockGrpcService.createOrder).toHaveBeenCalledWith(dto);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
