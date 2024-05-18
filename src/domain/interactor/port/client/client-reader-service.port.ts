import { Client } from '@/domain/entity/client/client.entity';

export abstract class ClientReaderServicePort {
  abstract findById(id: string): Promise<Client | null>;
  abstract findAll(): Promise<Client[]>;
}
