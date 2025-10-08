import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
