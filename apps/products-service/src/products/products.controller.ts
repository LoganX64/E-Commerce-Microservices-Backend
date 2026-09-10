import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('ProductsService', 'FindAll')
  async findAll() {
    const products = await this.productsService.findAll();
    return { products };
  }

  @GrpcMethod('ProductsService', 'FindOne')
  async findOne(data: { id: number }) {
    const product = await this.productsService.findOne(data.id);
    return product || {};
  }

  @GrpcMethod('ProductsService', 'CreateProduct')
  async createProduct(data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @GrpcMethod('ProductsService', 'UpdateProduct')
  async updateProduct(data: UpdateProductDto & { id: number }) {
    const { id, ...updateData } = data;
    return this.productsService.update(id, updateData);
  }

  @GrpcMethod('ProductsService', 'DeleteProduct')
  async deleteProduct(data: { id: number }) {
    return this.productsService.remove(data.id);
  }
}
