import { Product } from '@/domain/entity/product/product.entity';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { ProductRepository } from '@/domain/repository/product/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService implements ProductServicePort {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
