import { Product } from '@/domain/entity/product/product.entity';

export interface ProductRepository {
  findAll(): Product[];
}
export const ProductRepository = Symbol('ProductRepository');
