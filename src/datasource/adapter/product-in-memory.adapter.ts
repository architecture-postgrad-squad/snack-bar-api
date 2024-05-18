import { Product } from '@/domain/entity/product/product.entity';
import { IProductRepository } from '@/domain/repository/product/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductInMemoryAdapter implements IProductRepository {
  findAll(): Product[] {
    return [];
  }
}
