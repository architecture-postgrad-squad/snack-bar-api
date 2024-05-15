import { ProductInMemoryAdapter } from '@/datasource/adapter/product-in-memory.adapter';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { CreateService } from '@/domain/interactor/services/create/create.service';
import { FindAllService } from '@/domain/interactor/services/find-all/find-all.service';
import { FindByIdService } from '@/domain/interactor/services/find-by-id/find-by-id.service';
import { ProductRepository } from '@/domain/repository/product.repository';
import { ProductController } from '@/transport/controller/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductServicePort,
      useClass: CreateService,
    },
    {
      provide: ProductServicePort,
      useClass: FindAllService,
    },
    {
      provide: ProductServicePort,
      useClass: FindByIdService,
    },
    {
      provide: ProductRepository,
      useClass: ProductInMemoryAdapter,
    },
  ],
})
export class ProductModule {}
