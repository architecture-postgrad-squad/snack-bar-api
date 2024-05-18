import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { ProductRepository } from '@/domain/repository/product.repository';
import { FindAllProductsResponseDto } from '@/transport/dto/product/find-all/response/find-all-response.dto';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from '@prisma/client';

@Injectable()
export class GetAllService implements ProductServicePort {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async getAll(): Promise<FindAllProductsResponseDto> {
    const productList = await this.find();
    return this.formatResponse(productList);
  }

  private async find(): Promise<Product[]> {
    try {
      return await this.productRepository.findAll();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private formatResponse(productList: Product[]): FindAllProductsResponseDto {
    return {
      products: productList,
    };
  }
}
