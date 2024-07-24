import { Client } from '@/core/domain/client/client.entity';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { FindAllClientsUseCasesPort } from '../../port/client/find-all-clients-use-cases.port';

export class FindAllClientsUseCases implements FindAllClientsUseCasesPort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }
}
