import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductDatabaseAdapter } from './adapters/product.adapter';
import { ProductInMemoryRepository } from './repository/product-in-memory.repository';

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
