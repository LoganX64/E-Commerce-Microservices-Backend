import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'order',
          protoPath: join(__dirname, '../proto/order.proto'),
          url: process.env.ORDERS_GRPC_URL || 'localhost:50052',
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
