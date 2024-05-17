import { Client } from "@/domain/entity/client/client.entity";

export interface ClientRepository {
    save(client: Client): Promise<Client>
    findById(id: string): Promise<Client>
    findAll(): Promise<Client[]>
}

export const ClientRepository = Symbol('ClientRepository')