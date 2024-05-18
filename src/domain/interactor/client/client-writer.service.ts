import { BadRequestException } from '@/config/exceptions/custom-exceptions/bad-request.exception';
import { Client } from '@/domain/entity/client/client.entity';
import { ClientWriterServicePort } from '@/domain/interactor/port/client/client-writer-service.port';
import { IClientRepository } from '@/domain/repository/client/client.repository';
import { CreateClientDto } from '@/transport/dto/Client/create-client.dto';
import { UpdateClientDto } from '@/transport/dto/Client/update-client.dto';
import { PreconditionFailedException } from '@nestjs/common';

export class ClientWriterService implements ClientWriterServicePort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async create(createClientDTO: CreateClientDto): Promise<Client> {
    const client = new Client(
      null,
      createClientDTO.name,
      createClientDTO.email,
      createClientDTO.cpf,
    );
    if (client.isValid()) {
      return this.clientRepository.create(createClientDTO);
    }

    throw new BadRequestException({
      description: 'Invalid parameters - client must have cpf or name and email',
    });
  }

  async update(client: UpdateClientDto): Promise<Client> {
    const savedClient = await this.clientRepository.findById(client.id).catch((e) => {
      throw new PreconditionFailedException('Client not found');
    });

    const editedClient = new Client(
      savedClient.id,
      client.name,
      client.email,
      client.cpf,
    );
    if (editedClient.isValid()) {
      return this.clientRepository.update(client);
    }

    throw new BadRequestException({
      description: 'Invalid parameters - client must have cpf or name and email',
    });
  }
}
