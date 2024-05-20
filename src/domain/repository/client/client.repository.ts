import { Client } from '@/domain/entity/client/client.entity';
import { CreateClientDto } from '@/transport/dto/client/client.dto';
import { UpdateClientDto } from '@/transport/dto/client/update-client.dto';

export abstract class IClientRepository {
  abstract create(client: CreateClientDto): Promise<Client>;
  abstract update(client: UpdateClientDto): Promise<Client>;
  abstract findById(id: string): Promise<Client>;
  abstract findByCpf(cpf: string): Promise<Client>;
  abstract findAll(): Promise<Client[]>;
}
