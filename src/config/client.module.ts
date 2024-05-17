import { ClientPostgreAdapter } from "@/datasource/adapter/client/client-postgre.adapter";
import { ClientService } from "@/domain/interactor/client/client.service";
import { ClientServicePort } from "@/domain/interactor/port/client-service.port";
import { ClientRepository } from "@/domain/repository/client/client.repository";
import { ClientController } from "@/transport/controller/client.controller";
import { Module } from "@nestjs/common";
import { ProductInMemoryAdapter } from "src/datasource/adapter/product-in-memory.adapter";
import { ProductServicePort } from "src/domain/interactor/port/product-service.port";
import { ProductService } from "src/domain/interactor/product.service";
import { ProductRepository } from "src/domain/repository/product/product.repository";
import { ProductController } from "src/transport/controller/product.controller";

@Module({
    imports: [],
    controllers: [ClientController],
    providers: [
        {
            provide: ClientServicePort,
            useClass: ClientService,
        },
        {
            provide: ClientRepository,
            useClass: ClientPostgreAdapter,
        },
    ],
  })
  export class ClientModule {}