import { ProductDatabaseAdapter } from '@/datasource/adapter/product.adapter';
import { ProductInMemoryRepository } from '@/datasource/repository/product-in-memory.repository';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  providers: [
    PrismaClient,
    ProductInMemoryRepository,
    {
      provide: ProductDatabaseAdapter,
      useExisting: ProductInMemoryRepository,
    },
  ],
  exports: [ProductDatabaseAdapter],
})
export class DatasourceModule {}
