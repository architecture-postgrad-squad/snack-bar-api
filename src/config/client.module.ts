import { ClientPostgreAdapter } from "@/datasource/adapter/client/client-postgre.adapter";
import { ClientReaderService } from "@/domain/interactor/client/client-reader.service";
import { ClientWriterService } from "@/domain/interactor/client/client-writer.service";
import { ClientReaderServicePort } from "@/domain/interactor/port/client/client-reader-service.port";
import { ClientWriterServicePort } from "@/domain/interactor/port/client/client-writer-service.port";
import { ClientRepository } from "@/datasource/client.repository";
import { ClientController } from "@/transport/controller/client/client.controller";
import { Module } from "@nestjs/common";
import { DatasourceModule } from "@/datasource/datasource.module";

@Module({
    imports: [DatasourceModule],
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
    ],
    // exports: [ClientWriterServicePort, ClientReaderServicePort, ClientRepository]
})
export class ClientModule { }