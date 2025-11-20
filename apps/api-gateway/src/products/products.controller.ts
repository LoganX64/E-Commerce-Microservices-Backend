import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../shared/create-product.dto';
import { UpdateProductDto } from '../shared/update-product.dto';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private httpService: HttpService) {}

  private readonly productsServiceUrl = process.env.PRODUCTS_SERVICE_URL!;

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(): Observable<Product[]> {
    return this.httpService
      .get(this.productsServiceUrl) // Products Service URL
      .pipe(map((response) => response.data as Product[]));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string): Observable<Product> {
    return this.httpService
      .get<Product>(`${this.productsServiceUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductDto })
  async createProduct(@Body() body: CreateProductDto): Promise<Product> {
    const response = await firstValueFrom(
      this.httpService.post(this.productsServiceUrl, body),
    );
    return response.data as Product;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateProductDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    const response = await firstValueFrom(
      this.httpService.patch(`${this.productsServiceUrl}/${id}`, body),
    );
    return response.data as Product;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async deleteProduct(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const response = await firstValueFrom(
      this.httpService.delete(`${this.productsServiceUrl}/${id}`),
    );
    return response.data as { deleted: boolean };
  }
}
