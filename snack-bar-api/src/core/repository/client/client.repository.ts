import { Client } from '@/core/domain/client/client.entity';

export abstract class IClientRepository {
  abstract create(client: Client): Promise<Client>;
  abstract update(client: Client): Promise<Client>;
  abstract findById(id: string): Promise<Client>;
  abstract findByCpf(cpf: string): Promise<Client>;
  abstract findAll(): Promise<Client[]>;
}
