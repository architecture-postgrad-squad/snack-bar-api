import { ProductDatabaseAdapter } from '@/datasource/adapter/product.adapter';
import { ProductServicePort } from '@/domain/interactor/port/product/product-service.port';
import { ProductDto } from '@/transport/dto/product/nested/product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';

@Injectable()
export class GetByIdService implements ProductServicePort {
  constructor(private readonly productDbAdapter: ProductDatabaseAdapter) {}

  async getById(id: string): Promise<ProductDto> {
    return this.find(id);
  }

  private async find(id: string): Promise<Product> {
    try {
      return await this.productDbAdapter.findAById(id);
    } catch (error) {
      console.error(error);
      //TODO: udpate this to custom exception from development branch
      throw new NotFoundException();
    }
  }
}
