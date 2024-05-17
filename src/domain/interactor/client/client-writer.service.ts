import { ForbiddenException, Inject, PreconditionFailedException } from "@nestjs/common";
import { Client } from "@/domain/entity/client/client.entity";
import { ClientRepository } from "@/domain/repository/client/client.repository";
import { ClientWriterServicePort } from "@/domain/interactor/port/client/client-writer-service.port";

export class ClientWriterService implements ClientWriterServicePort {
    constructor(
        @Inject(ClientRepository)
        private readonly clientRepository: ClientRepository
    ) {}

    async create(client: Client): Promise<Client> {
        if (client.isValid()) {
            return this.clientRepository.save(client)
        }
        throw new PreconditionFailedException("Invalid parameters - client must have cpf or name and email")

    }

    async update(client: Client): Promise<Client> {
        const savedClient = await this.clientRepository.findById(client.id).catch((e) => { 
            console.log(`Client with id ${client.id} does not exists`)
            throw e
        })
        const editedClient = new Client(
            savedClient.id, 
            client.name || savedClient.name, 
            client.email || savedClient.email, 
            client.cpf || savedClient.cpf
        )
        if (client.isValid()) {
            return this.clientRepository.save(editedClient)
        }
        throw new PreconditionFailedException("Invalid parameters - client must have cpf or name and email") 
        
    }
    
}