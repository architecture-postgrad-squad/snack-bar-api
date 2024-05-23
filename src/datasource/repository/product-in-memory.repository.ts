import { ProductDatabaseAdapter } from '@/datasource/adapter/product.adapter';
import { PrismaClient, Product } from '@prisma/client';

export class ProductInMemoryRepository implements ProductDatabaseAdapter {
  //TODO: update this repository so that it uses prisma client service
  prisma = new PrismaClient();

  async create(product: Product): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        ...product,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findAById(id: string): Promise<Product> {
    return await this.prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
