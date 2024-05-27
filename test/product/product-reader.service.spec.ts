import { Product } from '@/core/domain/product/product.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { ProductReaderService } from '@/core/interactor/services/product/product-reader.service';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { randomUUID } from 'crypto';

describe('ProductReaderService', () => {
  let service: ProductReaderService;
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
      create: jest.fn((product) => Promise.resolve({ ...productMock, id })),
      findById: jest.fn((id) => Promise.resolve({ ...productMock })),
      findAll: jest.fn(() => Promise.resolve(productListMock)),
      findByCategory: jest.fn((id) => Promise.resolve(productListMock)),
    };

    service = new ProductReaderService(productRepository);
  });

  describe('getByCategory', () => {
    it('should return a products registered in requested category', async () => {
      (productRepository.findByCategory as jest.Mock).mockResolvedValue(productListMock);

      expect(await service.getByCategory(CategoryEnum['Lanche'])).toBe(productListMock);
      expect(productRepository.findByCategory).toHaveBeenCalledWith(
        CategoryEnum['Lanche'],
      );
    });

    it('should return empty array if there is no product for requested category', async () => {
      (productRepository.findByCategory as jest.Mock).mockResolvedValue([]);
      const products = await service.getByCategory(CategoryEnum['Lanche']);
      expect(products).toEqual([]);
    });
  });

  describe('getAll', () => {
    it('should return all registered products', async () => {
      (productRepository.findAll as jest.Mock).mockResolvedValue(productListMock);
      const productList = await service.getAll();
      expect(productList).toBe(productListMock);
    });

    it('should throw an error not possible to fetch all registered products', async () => {
      (productRepository.findAll as jest.Mock).mockRejectedValue(
        new Error('Prisma Error'),
      );

      try {
        await service.getAll();
      } catch (error) {
        expect(error).toEqual(new Error('Prisma Error'));
      }
    });
  });

  describe('getById', () => {
    it('should return product', async () => {
      (productRepository.findById as jest.Mock).mockResolvedValue(productMock);

      expect(await service.getById(id)).toBe(productMock);
      expect(productRepository.findById).toHaveBeenCalled();
    });

    it('should return an empty array if product is not found', async () => {
      (productRepository.findAll as jest.Mock).mockRejectedValue(new Error('Not found'));

      try {
        await service.getAll();
      } catch (error) {
        expect(error).toEqual(new Error('Not found'));
      }
    });
  });
});
