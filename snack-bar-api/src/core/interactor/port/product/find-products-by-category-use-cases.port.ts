import { Product } from '@/core/domain/product/product.entity';

export abstract class FindProductsByCategoryUseCasesPort {
  abstract execute(category: string): Promise<Product[]>;
}
