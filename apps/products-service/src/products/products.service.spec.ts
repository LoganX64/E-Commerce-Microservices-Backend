import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test: should create product
  it('should create a product', async () => {
    const dto = { code: 'P1', name: 'Test', description: 'D', price: 10 };

    mockRepository.create.mockReturnValue(dto);
    mockRepository.save.mockResolvedValue({ id: 1, ...dto });

    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  // Test: should return all products
  it('should return all products', async () => {
    mockRepository.find.mockResolvedValue([{ id: 1 }]);

    expect(await service.findAll()).toEqual([{ id: 1 }]);
  });

  // Test: should return one product
  it('should return one product', async () => {
    mockRepository.findOneBy.mockResolvedValue({ id: 1 });

    expect(await service.findOne(1)).toEqual({ id: 1 });
  });

  // Test: should update product
  it('should update a product', async () => {
    mockRepository.update.mockResolvedValue({ affected: 1 });
    mockRepository.findOneBy.mockResolvedValue({ id: 1, name: 'Updated' });

    const result = await service.update(1, { name: 'Updated' });
    expect(result).toEqual({ id: 1, name: 'Updated' });
  });

  // Test: should delete product
  it('should delete a product', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });

    expect(await service.remove(1)).toEqual({ deleted: true });
  });
});
