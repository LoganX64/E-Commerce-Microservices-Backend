import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../shared/create-order.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private httpService: HttpService) {}

  private readonly ordersServiceUrl = process.env.ORDERS_SERVICE_URL!;

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll() {
    return this.httpService
      .get(this.ordersServiceUrl) // Orders Service URL
      .pipe(map((response) => response.data));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string) {
    return this.httpService
      .get(`${this.ordersServiceUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiBody({ type: CreateOrderDto })
  create(@Body() orderData: any) {
    return this.httpService
      .post(this.ordersServiceUrl, orderData)
      .pipe(map((response) => response.data));
  }
}
