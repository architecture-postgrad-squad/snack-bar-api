import { Client } from '@/core/domain/client/client.entity';

export abstract class ClientReaderServicePort {
  abstract findById(id: string): Promise<Client | null>;
  abstract findByCpf(cpf: string): Promise<Client | null>;
  abstract findAll(): Promise<Client[]>;
}
