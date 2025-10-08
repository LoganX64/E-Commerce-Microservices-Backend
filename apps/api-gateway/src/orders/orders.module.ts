import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
