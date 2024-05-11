import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { ProductRepository } from '@/domain/repository/product.repository';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from '@prisma/client';

@Injectable()
export class FindAllService implements ProductServicePort {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  //TODO:  update return type
  async findAll(): Promise<any[]> {
    return this.find();
  }

  private async find(): Promise<Product[]> {
    try {
      return await this.productRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
