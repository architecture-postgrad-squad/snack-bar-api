import { Product } from '@/domain/entity/product/product.entity';
import { ProductReaderServicePort } from '@/domain/interactor/port/product/product-reader-service.port';
import { IProductRepository } from '@/domain/repository/product/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService implements ProductReaderServicePort {
  constructor(private readonly productRepository: IProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
