import { Product } from '@/core/domain/product/product.entity';

export abstract class FindProductByIdUseCasesPort {
  abstract execute(id: string): Promise<Product>;
}
