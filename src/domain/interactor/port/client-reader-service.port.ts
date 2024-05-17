import { Client } from "@/domain/entity/client/client.entity"

export interface ClientReaderServicePort {
    findById(id: string): Promise<Client|null>
    findAll(): Promise<Client[]>
}

export const ClientReaderServicePort = Symbol('ClientReaderServicePort')