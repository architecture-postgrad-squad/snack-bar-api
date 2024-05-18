import { ProductDatabaseAdapter } from '@/datasource/adapters/product.adapter';
import { Product } from '@/domain/entity/product/product.entity';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { CreateProductResponseDto } from '@/transport/dto/product/create/response/create-product-response.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product as ProductDbEntity } from '@prisma/client';

@Injectable()
export class CreateService implements ProductServicePort {
  constructor(private readonly productDbAdapter: ProductDatabaseAdapter) {}

  async create(requestBody: Product): Promise<CreateProductResponseDto> {
    const productDbEntity = await this.persistProduct(requestBody);
    return this.formatResponse(productDbEntity);
  }

  private async persistProduct(product: Product): Promise<ProductDbEntity> {
    try {
      return await this.productDbAdapter.create(product);
    } catch (error) {
      console.error(error);
      //TODO: refactor this catch to use custom exception from development branch
      throw new InternalServerErrorException();
    }
  }

  private formatResponse(product: ProductDbEntity): CreateProductResponseDto {
    return {
      id: product.id,
    };
  }
}
