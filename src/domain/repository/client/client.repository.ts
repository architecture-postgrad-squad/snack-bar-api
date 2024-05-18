import { Client } from '@/domain/entity/client/client.entity';
import { CreateClientDto } from '@/transport/dto/Client/create-client.dto';
import { UpdateClientDto } from '@/transport/dto/Client/update-client.dto';

export abstract class IClientRepository {
  abstract create(client: CreateClientDto): Promise<Client>;
  abstract update(client: UpdateClientDto): Promise<Client>;
  abstract findById(id: string): Promise<Client>;
  abstract findAll(): Promise<Client[]>;
}
