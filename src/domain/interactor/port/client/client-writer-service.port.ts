import { Client } from '@/domain/entity/client/client.entity';
import { CreateClientDTO } from '@/transport/dto/Client/create-client.dto';
import { UpdateClientDTO } from '@/transport/dto/Client/update-client.dto';

export abstract class ClientWriterServicePort {
  abstract create(client: CreateClientDTO): Promise<Client>;
  abstract update(client: UpdateClientDTO): Promise<Client>;
}
