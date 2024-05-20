import { ProductDatabaseAdapter } from '@/datasource/adapter/product.adapter';
import { ProductServicePort } from '@/domain/interactor/port/product/product-service.port';
import { GetAllProductsResponseDto } from '@/transport/dto/product/get-all/response/get-all-response.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from '@prisma/client';

@Injectable()
export class GetAllService implements ProductServicePort {
  constructor(private readonly productDbAdapter: ProductDatabaseAdapter) {}

  async getAll(): Promise<GetAllProductsResponseDto> {
    const productList = await this.find();
    return this.formatResponse(productList);
  }

  private async find(): Promise<Product[]> {
    try {
      return await this.productDbAdapter.findAll();
    } catch (error) {
      console.error(error);
      //TODO: update this to custom exceptions from development branch
      throw new InternalServerErrorException();
    }
  }

  private formatResponse(productList: Product[]): GetAllProductsResponseDto {
    return {
      products: productList,
    };
  }
}
