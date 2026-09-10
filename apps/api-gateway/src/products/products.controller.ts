import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../shared/create-product.dto';
import { UpdateProductDto } from '../shared/update-product.dto';

interface ProductsGrpcService {
  findAll(data: {}): Observable<{ products: any[] }>;
  findOne(data: { id: number }): Observable<any>;
  createProduct(data: any): Observable<any>;
  updateProduct(data: any): Observable<any>;
  deleteProduct(data: { id: number }): Observable<{ deleted: boolean }>;
}

@Controller('products')
@ApiTags('products')
export class ProductsController implements OnModuleInit {
  private productsGrpcService: ProductsGrpcService;

  constructor(@Inject('PRODUCTS_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productsGrpcService =
      this.client.getService<ProductsGrpcService>('ProductsService');
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(): Observable<any[]> {
    return this.productsGrpcService
      .findAll({})
      .pipe(map((response) => response.products || []));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  findOne(@Param('id') id: string): Observable<any> {
    return this.productsGrpcService.findOne({ id: +id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiBody({ type: CreateProductDto })
  createProduct(@Body() body: CreateProductDto): Observable<any> {
    return this.productsGrpcService.createProduct(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateProductDto })
  updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ): Observable<any> {
    return this.productsGrpcService.updateProduct({ id: +id, ...body });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  deleteProduct(@Param('id') id: string): Observable<{ deleted: boolean }> {
    return this.productsGrpcService.deleteProduct({ id: +id });
  }
}
