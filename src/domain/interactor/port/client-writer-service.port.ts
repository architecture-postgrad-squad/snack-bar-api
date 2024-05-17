import { Client } from "@/domain/entity/client/client.entity";

export interface ClientWriterServicePort {
    create(client: Client): Promise<Client>
    update(client: Client): Promise<Client>
}

export const ClientWriterServicePort = Symbol('ClientWriterServicePort')