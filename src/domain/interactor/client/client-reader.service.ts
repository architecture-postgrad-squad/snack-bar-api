import { Inject } from "@nestjs/common";
import { Client } from "@/domain/entity/client/client.entity";
import { ClientRepository } from "@/domain/repository/client/client.repository";
import { ClientReaderServicePort } from "@/domain/interactor/port/client/client-reader-service.port";

export class ClientReaderService implements ClientReaderServicePort {
    constructor(
        @Inject(ClientRepository)
        private readonly clientRepository: ClientRepository
    ) {}

    async findById(id: string): Promise<Client> {
        return this.clientRepository.findById(id).catch((e) => { 
            console.log(`Failed to find client by id ${id}`)
            throw e
        })
    }

    async findAll(): Promise<Client[]> {
        return this.clientRepository.findAll()
    }
}