import { Client } from "@/domain/entity/client/client.entity";

export abstract class ClientWriterServicePort {
    abstract create(client: Client): Promise<Client>
    abstract update(client: Client): Promise<Client>
}
