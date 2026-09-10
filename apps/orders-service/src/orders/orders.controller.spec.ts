import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: any;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new order', async () => {
    const dto: CreateOrderDto = {
      customer: { name: 'John Doe', phone: '1234567890' },
      products: [{ id: 1, name: 'book', rate: 10, qty: 1 }],
      totalAmount: 100,
    };
    const expected = { id: 1, ...dto };

    service.create.mockResolvedValue(expected);

    const result = await controller.createOrder(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expected);
  });

  it('should return all orders', async () => {
    const data = [{ id: 1 }];
    service.findAll.mockResolvedValue(data);

    expect(await controller.findAll()).toEqual({ orders: data });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single order by id', async () => {
    const data = { id: 1 };
    service.findOne.mockResolvedValue(data);

    expect(await controller.findOne({ id: 1 })).toEqual(data);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
