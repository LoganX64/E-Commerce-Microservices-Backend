import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CreateProductDto } from 'src/shared/create-product.dto';
import { UpdateProductDto } from 'src/shared/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let httpService: any;

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };

    process.env.PRODUCTS_SERVICE_URL = 'http://fake-products-service/products';

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    httpService = module.get<HttpService>(HttpService);
  });

  // GET /products
  it('should return all products', async () => {
    const data = [{ id: 1 }];
    httpService.get.mockReturnValue(of({ data }));

    const result = await controller.findAll().toPromise();

    expect(result).toEqual(data);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://fake-products-service/products',
    );
  });

  // GET /products/:id
  it('should return product by id', async () => {
    const data = { id: 1 };
    httpService.get.mockReturnValue(of({ data }));

    const result = await controller.findOne('1').toPromise();

    expect(result).toEqual(data);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://fake-products-service/products/1',
    );
  });

  // POST /products
  it('should create a product', async () => {
    const dto: CreateProductDto = {
      code: 'P001',
      name: 'Book',
      description: 'Desc',
      price: 100,
      image: 'img.jpg',
    };

    const responseData = { id: 1, ...dto };

    httpService.post.mockReturnValue(of({ data: responseData }));

    const result = await controller.createProduct(dto);

    expect(result).toEqual(responseData);
    expect(httpService.post).toHaveBeenCalledWith(
      'http://fake-products-service/products',
      dto,
    );
  });

  // PATCH /products/:id
  it('should update a product', async () => {
    const dto: UpdateProductDto = { name: 'Updated' };
    const responseData = { id: 1, name: 'Updated' };

    httpService.patch.mockReturnValue(of({ data: responseData }));

    const result = await controller.updateProduct('1', dto);

    expect(result).toEqual(responseData);
    expect(httpService.patch).toHaveBeenCalledWith(
      'http://fake-products-service/products/1',
      dto,
    );
  });

  // DELETE /products/:id
  it('should delete a product', async () => {
    const responseData = { deleted: true };

    httpService.delete.mockReturnValue(of({ data: responseData }));

    const result = await controller.deleteProduct('1');

    expect(result).toEqual(responseData);
    expect(httpService.delete).toHaveBeenCalledWith(
      'http://fake-products-service/products/1',
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
