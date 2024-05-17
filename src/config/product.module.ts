import { ProductInMemoryAdapter } from '@/datasource/adapter/product-in-memory.adapter';
import { ProductServicePort } from '@/domain/interactor/port/product/product-service.port';
import { ProductService } from '@/domain/interactor/product/product.service';
import { ProductRepository } from '@/domain/repository/product/product.repository';
import { ProductController } from '@/transport/controller/product/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductServicePort,
      useClass: ProductService,
    },
    {
      provide: ProductRepository,
      useClass: ProductInMemoryAdapter,
    },
  ],
})
export class ProductModule {}
