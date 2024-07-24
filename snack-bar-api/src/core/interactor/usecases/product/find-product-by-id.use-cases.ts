import { Product } from '@/core/domain/product/product.entity';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { FindProductByIdUseCasesPort } from '@/core/interactor/port/product/find-product-by-id-use-cases.port';
import { IProductRepository } from '@/core/repository/product/product.repository';

export class FindProductByIdUseCases implements FindProductByIdUseCasesPort {
  constructor(private readonly productRepository: IProductRepository) {}

  execute(id: string): Promise<Product> {
    try {
      return this.productRepository.findById(id);
    } catch (error) {
      console.error(error);
      throw new NotFoundException({ description: 'Product not found' });
    }
  }

}
