import { Prisma, Product } from '@prisma/client';

export interface ProductRepository {
  create(product: Prisma.ProductCreateInput): Promise<Product>;
  findAll(): Promise<Product[]>;
}
export const ProductRepository = Symbol('ProductRepository');
