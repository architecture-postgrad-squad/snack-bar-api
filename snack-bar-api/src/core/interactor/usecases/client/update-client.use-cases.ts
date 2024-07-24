import { Client } from '@/core/domain/client/client.entity';
import { BadRequestException } from '@/core/exceptions/custom-exceptions/bad-request.exception';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { UpdateClientUseCasesPort } from '../../port/client/update-client-use-cases.port';

export class UpdateClientUseCases implements UpdateClientUseCasesPort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(client: Client): Promise<Client> {
    await this.clientRepository.findById(client.id).catch(() => {
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
