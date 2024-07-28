import { Product } from '@/core/domain/product/product.entity';

export abstract class CreateProductUseCasesPort {
  abstract execute(requestBody: Product): Promise<Product>;
}
