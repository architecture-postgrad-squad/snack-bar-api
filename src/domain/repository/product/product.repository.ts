import { Product } from '@/domain/entity/product/product.entity';

export abstract class IProductRepository {
  abstract findAll(): Product[];
}
