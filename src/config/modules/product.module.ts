import { DatasourceModule } from '@/datasource/datasource.module';
import { ProductServicePort } from '@/domain/interactor/port/product-service.port';
import { CreateService } from '@/domain/interactor/services/create/create.service';
import { ProductController } from '@/transport/controller/product.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatasourceModule],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductServicePort,
      useClass: CreateService,
    },
  ],
  exports: [ProductServicePort],
})
export class ProductModule {}
