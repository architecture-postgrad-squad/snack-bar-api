import { Client } from '@/core/domain/client/client.entity';
import { BadRequestException } from '@/core/exceptions/custom-exceptions/bad-request.exception';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { CreateClientUseCasesPort } from '../../port/client/create-client-use-cases.port';

export class CreateClientUseCases implements CreateClientUseCasesPort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(client: Client): Promise<Client> {
    if (client.isValid()) {
      return this.clientRepository.create(client);
    }

    throw new BadRequestException({
      description: 'Invalid parameters - client must have cpf or name and email',
    });
  }
}
