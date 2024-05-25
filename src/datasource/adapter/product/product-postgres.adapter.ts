import { PrismaService } from '@/config/prisma.config';
import { Product } from '@/core/domain/product/product.entity';
import { CategoryEnum } from '@/core/enum/product/category.enum';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductPostgresAdapter implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

    findByCategory(category: CategoryEnum): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: {
              category: CategoryEnum[category],
            },
          }).then((products) => (products.map((product) => (this.toDomain(product)))));
    }

    create(product: Product): Promise<Product> {
        return this.prisma.product.create({
        data: {
            ...product,
            images: product.images && JSON.parse(JSON.stringify(product.images))
        },
        }).then((productPO) => (this.toDomain(productPO)));
    }

    findById(id: string): Promise<Product> {
        return this.prisma.product.findUnique({
        where: {
            id: id,
        },
        }).then((productPO) => (this.toDomain(productPO)));
    }

    findAll(): Promise<Product[]> {
        return this.prisma.product.findMany().then((products) => (products.map((product) => (this.toDomain(product)))));
    }

    private toDomain(productPO): Product {
        return {
            ...productPO, 
            category: productPO.category as CategoryEnum,
            images: productPO.images ? productPO.images.valueOf() as string[] : []
        }
    }
}
