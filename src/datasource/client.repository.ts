import { Client } from "@/domain/entity/client/client.entity";

export abstract class ClientRepository {
    abstract save(client: Client): Promise<Client>
    abstract findById(id: string): Promise<Client>
    abstract findAll(): Promise<Client[]>
} 