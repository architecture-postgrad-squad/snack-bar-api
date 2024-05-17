import { ClientPostgreAdapter } from "@/datasource/adapter/client/client-postgre.adapter"; 
import { ClientRepository } from "@/datasource/client.repository"; 
import { Module } from "@nestjs/common";
import { PrismaClient } from "@prisma/client"; 

@Module({
    imports: [],
    controllers: [],
    providers: [
        PrismaClient, ClientPostgreAdapter, {
            provide: ClientRepository,
            useClass: ClientPostgreAdapter
        }
    ],
    exports: [ClientRepository]
})
export class DatasourceModule { }