import { Client } from '@/core/domain/client/client.entity';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { FindClientByIdUseCasesPort } from '../../port/client/find-client-by-id-use-cases.port';

export class FindClientByIdUseCases implements FindClientByIdUseCasesPort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: string): Promise<Client> {
    try {
      return await this.clientRepository.findById(id);
    } catch (error) {
      throw new NotFoundException({
        description: 'Failed to find client by id',
      });
    }
  }
}
