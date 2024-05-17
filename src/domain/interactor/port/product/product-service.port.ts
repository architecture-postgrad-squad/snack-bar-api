import { Product } from '@/domain/entity/product/product.entity';

export interface ProductServicePort {
  findAll(): Promise<Product[]>;
}

export const ProductServicePort = Symbol('ProductServicePort');
