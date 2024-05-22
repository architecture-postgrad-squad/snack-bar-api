import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.config';
import { ProductController } from '@/transport/controller/product.controller';
import { ProductWriterServicePort } from '@/core/interactor/port/product/product-writer-service.port';
import { ProductWriterService } from '@/core/interactor/services/product/product-writer.service';
import { IProductRepository } from '@/core/repository/product/product.repository';
import { ProductReaderServicePort } from '@/core/interactor/port/product/product-reader-service.port';
import { ProductReaderService } from '@/core/interactor/services/product/product-reader.service';
import { ProductPostgresAdapter } from '@/datasource/adapter/product/product-postgres.adapter';

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
