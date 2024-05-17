import { ClientPostgreAdapter } from "@/datasource/adapter/client/client-postgre.adapter";
import { ClientReaderService } from "@/domain/interactor/client/client-reader.service";
import { ClientWriterService } from "@/domain/interactor/client/client-writer.service";
import { ClientReaderServicePort } from "@/domain/interactor/port/client-reader-service.port";
import { ClientWriterServicePort } from "@/domain/interactor/port/client-writer-service.port";
import { ClientRepository } from "@/domain/repository/client/client.repository";
import { ClientController } from "@/transport/controller/client/client.controller";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    controllers: [ClientController],
    providers: [
        {
            provide: ClientWriterServicePort,
            useClass: ClientWriterService,
        },
        {
            provide: ClientReaderServicePort,
            useClass: ClientReaderService,
        },
        {
            provide: ClientRepository,
            useClass: ClientPostgreAdapter,
        },
    ],
  })
  export class ClientModule {}