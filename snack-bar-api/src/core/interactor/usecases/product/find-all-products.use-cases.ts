import { Product } from '@/core/domain/product/product.entity';
import { FindAllProductsUseCasesPort } from '@/core/interactor/port/product/find-all-products-use-cases.port';
import { IProductRepository } from '@/core/repository/product/product.repository';

export class FindAllProductsUseCases implements FindAllProductsUseCasesPort {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

}
