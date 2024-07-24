import { Product } from '@/core/domain/product/product.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { FindProductsByCategoryUseCases } from '@/core/interactor/usecases/product/find-products-by-category.use-cases';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { randomUUID } from 'crypto';

describe('FindProductsByCategoryUseCases', () => {
    let useCase: FindProductsByCategoryUseCases;
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

        useCase = new FindProductsByCategoryUseCases(productRepository);
    });

    it('should return a products registered in requested category', async () => {
        (productRepository.findByCategory as jest.Mock).mockResolvedValue(productListMock);

        expect(await useCase.execute('BURGUER')).toBe(productListMock);
        expect(productRepository.findByCategory).toHaveBeenCalledWith('Lanche');
    });

    it('should return empty array if there is no product for requested category', async () => {
        (productRepository.findByCategory as jest.Mock).mockResolvedValue([]);
        const products = await useCase.execute('BURGUER');
        expect(products).toEqual([]);
    });
    
});
