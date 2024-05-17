import { ForbiddenException, Inject, PreconditionFailedException } from "@nestjs/common";
import { Client } from "../../entity/client/client.entity";
import { ClientRepository } from "../../repository/client/client.repository";
import { ClientServicePort } from "../port/client-service.port";

export class ClientService implements ClientServicePort {
    constructor(
        @Inject(ClientRepository)
        private readonly clientRepository: ClientRepository
    ) {}

    findById(id: string): Promise<Client|null> {
        return this.clientRepository.getById(id) 
    }

    findAll(): Promise<Client[]> {
        return this.clientRepository.getAll() 
    }

    async create(client: Client): Promise<Client> {
        if (this.isValidClient(client)) {
            return this.clientRepository.save(client)
        }
        throw new PreconditionFailedException("Invalid parameters - client must have cpf or name and email")

    }

    async update(client: Client): Promise<Client> {
        const savedClient = await this.clientRepository.getById(client.id) 
        if (savedClient) {
            const editedClient = new Client(
                savedClient.id, 
                client.name || savedClient.name, 
                client.email || savedClient.email, 
                client.cpf || savedClient.cpf
            )
            if (this.isValidClient(editedClient)) {
                return this.clientRepository.save(editedClient)
            }
            throw new PreconditionFailedException("Invalid parameters - client must have cpf or name and email") 
        }
        throw new ForbiddenException("Failed to save client")
    }

    private isValidClient(client: Client) {
        return client.cpf || (client.email && client.name)
    }
    
}