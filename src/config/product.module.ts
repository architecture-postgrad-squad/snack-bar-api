import { ProductInMemoryAdapter } from '@/datasource/adapter/product-in-memory.adapter';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { FindAllService } from '@/domain/interactor/services/find-all.service';
import { ProductRepository } from '@/domain/repository/product.repository';
import { ProductController } from '@/transport/controller/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductServicePort,
      useClass: FindAllService,
    },
    {
      provide: ProductRepository,
      useClass: ProductInMemoryAdapter,
    },
  ],
})
export class ProductModule {}
