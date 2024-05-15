import { Product } from '@/domain/entity/product/product.entity';
import { ProductRepository } from '@/domain/repository/product/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductInMemoryAdapter implements ProductRepository {
  findAll(): Product[] {
    return [];
  }
}
