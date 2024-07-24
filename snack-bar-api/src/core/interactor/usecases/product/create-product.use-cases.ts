import { Product } from '@/core/domain/product/product.entity';
import { CreateProductUseCasesPort } from '@/core/interactor/port/product/create-product-use-cases.port';
import { IProductRepository } from '@/core/repository/product/product.repository';

export class CreateProductUseCases implements CreateProductUseCasesPort {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(product: Product): Promise<Product> {
    try {
      return await this.productRepository.create(product);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
