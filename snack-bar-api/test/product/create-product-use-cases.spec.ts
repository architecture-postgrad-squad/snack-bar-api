import { CategoryEnum } from '@/core/domain/product/category.entity';
import { Product } from '@/core/domain/product/product.entity';
import { CreateProductUseCases } from '@/core/interactor/usecases/product/create-product.use-cases';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { toDomain } from '@/transport/dto/product/create-product.dto';
import { randomUUID } from 'crypto';

describe('CreateProductUseCases', () => {
  let useCase: CreateProductUseCases;
  let productRepository: IProductRepository;
  const id = randomUUID();

  beforeEach(async () => {
    productRepository = {
      create: jest.fn((product) => Promise.resolve({ ...product, id })),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByCategory: jest.fn(),
    };

    useCase = new CreateProductUseCases(productRepository);
  });

  it('should create a product register and return it', async () => {
    const product: Product = {
      name: 'X Bacon',
      category: CategoryEnum['Lanche'],
      price: 12.99,
    };

    const expectedPayment: Product = {
      ...product,
      id,
    };

    jest.spyOn(productRepository, 'create').mockResolvedValue(expectedPayment);

    const result = await useCase.execute(toDomain(product));
    expect(result).toEqual(expectedPayment);
    expect(productRepository.create).toHaveBeenCalledWith(toDomain(product));
  });

  it('should handle errors if not possible to create product register', async () => {
    const product: Product = {
      name: 'X Bacon',
      category: CategoryEnum['Lanche'],
      price: 12.99,
    };

    jest
      .spyOn(productRepository, 'create')
      .mockRejectedValue(new Error('Failed to create product register'));
    await expect(useCase.execute(toDomain(product))).rejects.toThrow(
      new Error('Failed to create product register'),
    );
  });
});
