import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
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

  it('should create a product', async () => {
    const dto = { code: 'P1', name: 'A', description: 'D', price: 100 };
    mockService.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.createProduct(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should return all products', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);

    const result = await controller.findAll();
    expect(result).toEqual({ products: [{ id: 1 }] });
  });

  it('should return one product', async () => {
    mockService.findOne.mockResolvedValue({ id: 1 });

    const result = await controller.findOne({ id: 1 });
    expect(result).toEqual({ id: 1 });
  });

  it('should update a product', async () => {
    const updateDto = { id: 1, name: 'Updated Name' };
    const updatedProduct = { id: 1, name: 'Updated Name' };

    mockService.update.mockResolvedValue(updatedProduct);

    const result = await controller.updateProduct(updateDto);

    expect(mockService.update).toHaveBeenCalledWith(1, { name: 'Updated Name' });
    expect(result).toEqual(updatedProduct);
  });

  it('should delete a product', async () => {
    mockService.remove.mockResolvedValue({ deleted: true });

    const result = await controller.deleteProduct({ id: 1 });

    expect(mockService.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });
});
