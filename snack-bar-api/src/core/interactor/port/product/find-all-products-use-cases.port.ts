import { Product } from '@/core/domain/product/product.entity';

export abstract class FindAllProductsUseCasesPort {
  abstract execute(): Promise<Product[]>;
  }
