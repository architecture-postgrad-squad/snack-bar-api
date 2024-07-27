import { PrismaService } from '@/config/prisma.config';
import { ProductReaderServicePort } from '@/core/interactor/port/product/product-reader-service.port';
import { ProductWriterServicePort } from '@/core/interactor/port/product/product-writer-service.port';
import { ProductReaderService } from '@/core/interactor/services/product/product-reader.service';
import { ProductWriterService } from '@/core/interactor/services/product/product-writer.service';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { ProductPostgresAdapter } from '@/datasource/database/adapter/product/product-postgres.adapter';
import { ProductController } from '@/transport/controller/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: ProductWriterServicePort,
      useFactory: (productRepository: IProductRepository) => {
        return new ProductWriterService(productRepository);
      },
      inject: [IProductRepository],
    },
    {
      provide: ProductReaderServicePort,
      useFactory: (productRepository: IProductRepository) => {
        return new ProductReaderService(productRepository);
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
