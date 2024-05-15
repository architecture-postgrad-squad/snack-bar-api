import { Product } from '@/domain/entity/product/product.entity';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { ProductRepository } from '@/domain/repository/product.repository';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product as ProductDbEntity } from '@prisma/client';

@Injectable()
export class CreateService implements ProductServicePort {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(requestBody: Product): Promise<CreateProductResponseDto> {
    const productDbEntity = await this.persistProduct(requestBody);
    return this.formatResponse(productDbEntity);
  }

  private async persistProduct(product: Product): Promise<ProductDbEntity> {
    try {
      return await this.productRepository.create(product);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  private formatResponse(product: ProductDbEntity): CreateProductResponseDto {
    return {
      id: product.id,
    };
  }
}
