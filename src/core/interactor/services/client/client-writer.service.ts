import { BadRequestException } from '@/config/exceptions/custom-exceptions/bad-request.exception';
import { NotFoundException } from '@/config/exceptions/custom-exceptions/not-found.exception';
import { Client } from '@/core/domain/client/client.entity';
import { ClientWriterServicePort } from '@/core/interactor/port/client/client-writer-service.port';
import { IClientRepository } from '@/core/repository/client/client.repository';

export class ClientWriterService implements ClientWriterServicePort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async create(client: Client): Promise<Client> {
    if (client.isValid()) {
      return this.clientRepository.create(client);
    }

    throw new BadRequestException({
      description: 'Invalid parameters - client must have cpf or name and email',
    });
  }

  async update(client: Client): Promise<Client> {
    const savedClient = await this.clientRepository.findById(client.id).catch((e) => {
      throw new NotFoundException({ description: 'Client not found' });
    });

    if (client.isValid()) {
      return this.clientRepository.update(client);
    }

    throw new BadRequestException({
      description: 'Invalid parameters - client must have cpf or name and email',
    });
  }
}
