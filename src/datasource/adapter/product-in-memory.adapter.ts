import { ProductRepository } from '@/domain/repository/product.repository';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Product } from '@prisma/client';

@Injectable()
export class ProductInMemoryAdapter implements ProductRepository {
  prisma = new PrismaClient();

  async create(product: Prisma.ProductCreateInput): Promise<Product> {
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
