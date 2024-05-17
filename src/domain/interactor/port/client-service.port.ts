import { Client } from "@/domain/entity/client/client.entity";

export interface ClientServicePort {
    create(client: Client): Promise<Client>
    update(client: Client): Promise<Client>
    findById(id: string): Promise<Client|null>
    findAll(): Promise<Client[]>
}

export const ClientServicePort = Symbol('ClientServicePort')