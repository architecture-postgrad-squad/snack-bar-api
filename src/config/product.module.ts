import { ProductInMemoryAdapter } from '@/datasource/adapter/product-in-memory.adapter';
import { ProductReaderServicePort } from '@/domain/interactor/port/product/product-reader-service.port';
import { ProductService } from '@/domain/interactor/product/product.service';
import { IProductRepository } from '@/domain/repository/product/product.repository';
import { ProductController } from '@/transport/controller/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductReaderServicePort,
      useClass: ProductService,
    },
    {
      provide: IProductRepository,
      useClass: ProductInMemoryAdapter,
    },
  ],
})
export class ProductModule {}
