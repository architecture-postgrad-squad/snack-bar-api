import { ProductInMemoryAdapter } from '@/datasource/adapter/product-in-memory.adapter';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { CreateService } from '@/domain/interactor/services/create/create.service';
import { GetAllService } from '@/domain/interactor/services/get-all/get-all.service';
import { GetByIdService } from '@/domain/interactor/services/get-by-id/get-by-id.service';
import { ProductRepository } from '@/domain/repository/product.repository';
import { ProductController } from '@/transport/controller/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductServicePort,
      useExisting: CreateService,
    },
    {
      provide: ProductServicePort,
      useExisting: GetAllService,
    },
    {
      provide: ProductServicePort,
      useExisting: GetByIdService,
    },
    {
      provide: ProductRepository,
      useExisting: ProductInMemoryAdapter,
    },
  ],
  exports: [ProductServicePort],
})
export class ProductModule {}
