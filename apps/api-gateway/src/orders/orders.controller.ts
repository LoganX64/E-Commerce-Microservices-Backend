import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../shared/create-order.dto';
import { Observable } from 'rxjs';

interface OrdersGrpcService {
  findAll(data: {}): Observable<{ orders: any[] }>;
  findOne(data: { id: number }): Observable<any>;
  createOrder(data: any): Observable<any>;
}

@Controller('orders')
@ApiTags('orders')
export class OrdersController implements OnModuleInit {
  private ordersGrpcService: OrdersGrpcService;

  constructor(@Inject('ORDERS_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.ordersGrpcService =
      this.client.getService<OrdersGrpcService>('OrdersService');
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll(): Observable<any[]> {
    return this.ordersGrpcService
      .findAll({})
      .pipe(map((response) => response.orders || []));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string): Observable<any> {
    return this.ordersGrpcService.findOne({ id: +id });
  }

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() orderData: CreateOrderDto): Observable<any> {
    return this.ordersGrpcService.createOrder(orderData);
  }
}
