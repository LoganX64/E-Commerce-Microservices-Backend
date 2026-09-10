import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod('OrdersService', 'CreateOrder')
  async createOrder(data: CreateOrderDto) {
    return this.ordersService.create(data);
  }

  @GrpcMethod('OrdersService', 'FindAll')
  async findAll() {
    const orders = await this.ordersService.findAll();
    return { orders };
  }

  @GrpcMethod('OrdersService', 'FindOne')
  async findOne(data: { id: number }) {
    const order = await this.ordersService.findOne(data.id);
    return order || {};
  }
}
