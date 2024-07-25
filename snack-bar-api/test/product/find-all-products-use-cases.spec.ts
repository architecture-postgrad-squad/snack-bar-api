import { Product } from '@/core/domain/product/product.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { FindAllProductsUseCases } from '@/core/interactor/usecases/product/find-all-products.use-cases';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { randomUUID } from 'crypto';

describe('FindAllProductsUseCases', () => {
  let useCase: FindAllProductsUseCases;
  let productRepository: IProductRepository;

  const id = randomUUID();
  const productMock: Product = {
    name: 'X Bacon',
    category: CategoryEnum['Lanche'],
    price: 12.99,
    id,
  };
  const productListMock: Product[] = [
    productMock,
    {
      name: 'X Tudo',
      category: CategoryEnum['Lanche'],
      price: 15.99,
      id: randomUUID(),
    },
  ];

  beforeEach(async () => {
    productRepository = {
      create: jest.fn(() => Promise.resolve({ ...productMock, id })),
      findById: jest.fn(() => Promise.resolve({ ...productMock })),
      findAll: jest.fn(() => Promise.resolve(productListMock)),
      findByCategory: jest.fn(() => Promise.resolve(productListMock)),
    };

    useCase = new FindAllProductsUseCases(productRepository);
  });

  it('should return all registered products', async () => {
    (productRepository.findAll as jest.Mock).mockResolvedValue(productListMock);
    const productList = await useCase.execute();
    expect(productList).toBe(productListMock);
  });

  it('should throw an error not possible to fetch all registered products', async () => {
    (productRepository.findAll as jest.Mock).mockRejectedValue(new Error('Prisma Error'));

    try {
      await useCase.execute();
    } catch (error) {
      expect(error).toEqual(new Error('Prisma Error'));
    }
  });
});
