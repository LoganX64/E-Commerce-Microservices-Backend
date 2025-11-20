import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CreateOrderDto } from 'src/shared/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let httpService: any;

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn(),
      post: jest.fn(),
    };

    process.env.ORDERS_SERVICE_URL = 'http://fake-orders-service/orders';

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    httpService = module.get<HttpService>(HttpService);
  });

  // GET /orders

  it('should return all orders', async () => {
    const data = [{ id: 1 }];
    httpService.get.mockReturnValue(of({ data }));

    const result = await controller.findAll().toPromise();
    expect(result).toEqual(data);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://fake-orders-service/orders',
    );
  });

  // GET /orders/:id

  it('should return an order by id', async () => {
    const data = { id: 1 };
    httpService.get.mockReturnValue(of({ data }));

    const result = await controller.findOne('1').toPromise();

    expect(result).toEqual(data);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://fake-orders-service/orders/1',
    );
  });

  // POST /orders
  it('should create an order', async () => {
    const dto: CreateOrderDto = {
      customer: { name: 'John', phone: '1234567890' },
      products: [{ id: 1, name: 'Book', rate: 10, qty: 1 }],
      totalAmount: 10,
    };

    const resultData = { id: 1, ...dto };
    httpService.post.mockReturnValue(of({ data: resultData }));

    const result = await controller.create(dto).toPromise();

    expect(result).toEqual(resultData);
    expect(httpService.post).toHaveBeenCalledWith(
      'http://fake-orders-service/orders',
      dto,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
