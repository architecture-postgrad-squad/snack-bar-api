import { BadRequestException } from '@/config/exceptions/custom-exceptions/bad-request.exception';
import { NotFoundException } from '@/config/exceptions/custom-exceptions/not-found.exception';
import { Client } from '@/domain/entity/client/client.entity';
import { ClientWriterServicePort } from '@/domain/interactor/port/client/client-writer-service.port';
import { IClientRepository } from '@/domain/repository/client/client.repository';
import { CreateClientDto } from '@/transport/dto/client/client.dto';
import { UpdateClientDto } from '@/transport/dto/client/update-client.dto';

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
      throw new NotFoundException({ description: 'Client not found' });
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
