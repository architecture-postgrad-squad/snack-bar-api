import { Module } from '@nestjs/common';

import { PrismaService } from '@/config/prisma.config';
import { CreateProductUseCasesPort } from '@/core/interactor/port/product/create-product-use-cases.port';
import { FindAllProductsUseCasesPort } from '@/core/interactor/port/product/find-all-products-use-cases.port';
import { FindProductByIdUseCasesPort } from '@/core/interactor/port/product/find-product-by-id-use-cases.port';
import { FindProductsByCategoryUseCasesPort } from '@/core/interactor/port/product/find-products-by-category-use-cases.port';
import { CreateProductUseCases } from '@/core/interactor/usecases/product/create-product.use-cases';
import { FindAllProductsUseCases } from '@/core/interactor/usecases/product/find-all-products.use-cases';
import { FindProductByIdUseCases } from '@/core/interactor/usecases/product/find-product-by-id.use-cases';
import { FindProductsByCategoryUseCases } from '@/core/interactor/usecases/product/find-products-by-category.use-cases';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { ProductPostgresAdapter } from '@/datasource/database/adapter/product/product-postgres.adapter';
import { ProductController } from '@/transport/controller/product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: CreateProductUseCasesPort,
      useFactory: (productRepository: IProductRepository) => {
        return new CreateProductUseCases(productRepository);
      },
      inject: [IProductRepository],
    },
    {
      provide: FindAllProductsUseCasesPort,
      useFactory: (productRepository: IProductRepository) => {
        return new FindAllProductsUseCases(productRepository);
      },
      inject: [IProductRepository],
    },
    {
      provide: FindProductByIdUseCasesPort,
      useFactory: (productRepository: IProductRepository) => {
        return new FindProductByIdUseCases(productRepository);
      },
      inject: [IProductRepository],
    },
    {
      provide: FindProductsByCategoryUseCasesPort,
      useFactory: (productRepository: IProductRepository) => {
        return new FindProductsByCategoryUseCases(productRepository);
      },
      inject: [IProductRepository],
    },

    {
      provide: IProductRepository,
      useClass: ProductPostgresAdapter,
    },
  ],
})
export class ProductModule {}
