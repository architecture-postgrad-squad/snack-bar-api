import { Product } from '@/domain/entity/product/product.entity';

export abstract class ProductReaderServicePort {
  abstract findAll(): Promise<Product[]>;
}
