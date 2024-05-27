import { Product } from '@/core/domain/product/product.entity';

export abstract class ProductWriterServicePort {
  abstract create(requestBody: Product): Promise<Product>;
}
