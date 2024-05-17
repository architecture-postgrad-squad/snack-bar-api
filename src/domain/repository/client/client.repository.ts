import { Client } from "@/domain/entity/client/client.entity";

export interface ClientRepository {
    save(client: Client): Promise<Client>
    getById(id: string): Promise<Client|null>
    getAll(): Promise<Client[]>
}

export const ClientRepository = Symbol('ClientRepository')