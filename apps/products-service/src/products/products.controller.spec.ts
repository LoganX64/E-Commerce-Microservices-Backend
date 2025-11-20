import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test: POST /products
  it('should create a product', () => {
    const dto = { code: 'P1', name: 'A', description: 'D', price: 100 };

    mockService.create.mockReturnValue({ id: 1, ...dto });

    expect(controller.create(dto)).toEqual({ id: 1, ...dto });
  });

  // Test: GET /products
  it('should return all products', () => {
    mockService.findAll.mockReturnValue([{ id: 1 }]);

    expect(controller.findAll()).toEqual([{ id: 1 }]);
  });

  // Test: GET /products/:id
  it('should return one product', () => {
    mockService.findOne.mockReturnValue({ id: 1 });

    expect(controller.findOne('1')).toEqual({ id: 1 });
  });

  // Test: PATCH /products/:id
  it('should update a product', async () => {
    const updateDto = { name: 'Updated Name' };
    const updatedProduct = { id: 1, ...updateDto };

    mockService.update.mockResolvedValue(updatedProduct);

    const result = await controller.update('1', updateDto);

    expect(mockService.update).toHaveBeenCalledWith(1, updateDto);
    expect(result).toEqual(updatedProduct);
  });

  // Test: DELETE /products/:id
  it('should remove a product', async () => {
    mockService.remove.mockResolvedValue({ deleted: true });

    const result = await controller.remove('1');

    expect(mockService.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });
});
