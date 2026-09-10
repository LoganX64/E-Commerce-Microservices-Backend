import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { of } from 'rxjs';
import { CreateProductDto } from '../shared/create-product.dto';
import { UpdateProductDto } from '../shared/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockGrpcService: any;

  beforeEach(async () => {
    mockGrpcService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    };

    const mockClientGrpc = {
      getService: jest.fn().mockReturnValue(mockGrpcService),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: 'PRODUCTS_SERVICE',
          useValue: mockClientGrpc,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    controller.onModuleInit();
  });

  it('should return all products', async () => {
    const data = [{ id: 1 }];
    mockGrpcService.findAll.mockReturnValue(of({ products: data }));

    const result = await controller.findAll().toPromise();

    expect(result).toEqual(data);
    expect(mockGrpcService.findAll).toHaveBeenCalledWith({});
  });

  it('should return product by id', async () => {
    const data = { id: 1 };
    mockGrpcService.findOne.mockReturnValue(of(data));

    const result = await controller.findOne('1').toPromise();

    expect(result).toEqual(data);
    expect(mockGrpcService.findOne).toHaveBeenCalledWith({ id: 1 });
  });

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      code: 'P001',
      name: 'Book',
      description: 'Desc',
      price: 100,
      image: 'img.jpg',
    };

    const responseData = { id: 1, ...dto };
    mockGrpcService.createProduct.mockReturnValue(of(responseData));

    const result = await controller.createProduct(dto).toPromise();

    expect(result).toEqual(responseData);
    expect(mockGrpcService.createProduct).toHaveBeenCalledWith(dto);
  });

  it('should update a product', async () => {
    const dto: UpdateProductDto = { name: 'Updated' };
    const responseData = { id: 1, name: 'Updated' };

    mockGrpcService.updateProduct.mockReturnValue(of(responseData));

    const result = await controller.updateProduct('1', dto).toPromise();

    expect(result).toEqual(responseData);
    expect(mockGrpcService.updateProduct).toHaveBeenCalledWith({
      id: 1,
      ...dto,
    });
  });

  it('should delete a product', async () => {
    const responseData = { deleted: true };
    mockGrpcService.deleteProduct.mockReturnValue(of(responseData));

    const result = await controller.deleteProduct('1').toPromise();

    expect(result).toEqual(responseData);
    expect(mockGrpcService.deleteProduct).toHaveBeenCalledWith({ id: 1 });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
