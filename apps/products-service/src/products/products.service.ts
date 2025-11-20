import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRespository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRespository.create(createProductDto);
    return this.productsRespository.save(newProduct);
  }

  async update(id: number, updateData: Partial<UpdateProductDto>) {
    await this.productsRespository.update(id, updateData);
    return this.productsRespository.findOneBy({ id });
  }

  findAll() {
    return this.productsRespository.find();
  }

  findOne(id: number) {
    return this.productsRespository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.productsRespository.delete(id);
    return { deleted: true };
  }
}
