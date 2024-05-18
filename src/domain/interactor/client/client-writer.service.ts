import { Client } from '@/domain/entity/client/client.entity';
import { ClientWriterServicePort } from '@/domain/interactor/port/client/client-writer-service.port';
import { IClientRepository } from '@/domain/repository/client/client.repository';
import { CreateClientDTO } from '@/transport/dto/Client/create-client.dto';
import { UpdateClientDTO } from '@/transport/dto/Client/update-client.dto';
import { PreconditionFailedException } from '@nestjs/common';

export class ClientWriterService implements ClientWriterServicePort {
  constructor(private readonly clientRepository: IClientRepository) { }

  async create(createClientDTO: CreateClientDTO): Promise<Client> {
    const client = new Client(
      null,
      createClientDTO.name,
      createClientDTO.email,
      createClientDTO.cpf,
    );
    if (client.isValid()) {
      return this.clientRepository.create(createClientDTO);
    }
    throw new PreconditionFailedException(
      'Invalid parameters - client must have cpf or name and email',
    );
  }

  async update(client: UpdateClientDTO): Promise<Client> {
    const savedClient = await this.clientRepository.findById(client.id).catch((e) => {
      throw new PreconditionFailedException('Client not found');
    });
    const editedClient = new Client(
      savedClient.id,
      client.name ,
      client.email ,
      client.cpf,
    );
    if (editedClient.isValid()) {
      return this.clientRepository.update(client);
    }
    throw new PreconditionFailedException(
      'Invalid parameters - client must have cpf or name and email',
    );
  }
}
