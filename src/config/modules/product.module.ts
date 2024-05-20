import { DatasourceModule } from '@/datasource/datasource.module';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { CreateService } from '@/domain/interactor/services/create/create.service';
import { GetAllService } from '@/domain/interactor/services/get-all/get-all.service';
import { GetByIdService } from '@/domain/interactor/services/get-by-id/get-by-id.service';
import { ProductController } from '@/transport/controller/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatasourceModule],
  controllers: [ProductController],
  providers: [
    CreateService,
    {
      provide: ProductServicePort,
      useExisting: CreateService,
    },
    GetAllService,
    {
      provide: ProductServicePort,
      useExisting: GetAllService,
    },
    GetByIdService,
    {
      provide: ProductServicePort,
      useExisting: GetByIdService,
    },
  ],
  exports: [ProductServicePort],
})
export class ProductModule {}
