import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { ProductRepository } from '@/domain/repository/product.repository';
import { ProductDto } from '@/transport/dto/product/nested/product.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';

@Injectable()
export class GetByIdService implements ProductServicePort {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async getById(id: string): Promise<ProductDto> {
    return this.find(id);
  }

  private async find(id: string): Promise<Product> {
    try {
      return await this.productRepository.findAById(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException();
    }
  }
}
