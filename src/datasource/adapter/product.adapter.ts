import { Prisma, Product } from '@prisma/client';

export abstract class ProductDatabaseAdapter {
  abstract create(product: Prisma.ProductCreateInput): Promise<Product>;
  abstract findAById(id: string): Promise<Product>;
  abstract findAll(): Promise<Product[]>;
}
