import { Module } from "@nestjs/common";
import { ProductInMemoryAdapter } from "src/datasource/adapter/product-in-memory.adapter";
import { ProductServicePort } from "src/domain/interactor/port/product-service.port";
import { ProductService } from "src/domain/interactor/product.service";
import { ProductRepository } from "src/domain/repository/product/product.repository";
import { ProductController } from "src/transport/controller/product.controller";

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