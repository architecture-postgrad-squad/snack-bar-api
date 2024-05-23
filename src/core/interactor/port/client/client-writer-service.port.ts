import { Client } from '@/core/domain/client/client.entity';
import { CreateClientDto } from '@/transport/dto/client/create-client.dto';
import { UpdateClientDto } from '@/transport/dto/client/update-client.dto';

export abstract class ClientWriterServicePort {
  abstract create(client: CreateClientDto): Promise<Client>;
  abstract update(client: UpdateClientDto): Promise<Client>;
}
