import { Product } from '@/core/domain/product/product.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { FindProductByIdUseCases } from '@/core/interactor/usecases/product/find-product-by-id.use-cases';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { randomUUID } from 'crypto';

describe('FindProductByIdUseCases', () => {
  let useCase: FindProductByIdUseCases;
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

    useCase = new FindProductByIdUseCases(productRepository);
  });

  it('should return product', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue(productMock);

    expect(await useCase.execute(id)).toBe(productMock);
    expect(productRepository.findById).toHaveBeenCalled();
  });

  it('should return an empty array if product is not found', async () => {
    (productRepository.findAll as jest.Mock).mockRejectedValue(new Error('Not found'));

    try {
      await useCase.execute('1');
    } catch (error) {
      expect(error).toEqual(new Error('Not found'));
    }
  });
});
