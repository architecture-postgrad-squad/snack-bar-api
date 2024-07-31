import { Client } from '@/core/domain/client/client.entity';
import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { IClientRepository } from '@/core/repository/client/client.repository';
import { FindClientByCpfUseCasesPort } from '../../port/client/find-client-by-cpf-use-cases.port';

export class FindClientByCpfUseCases implements FindClientByCpfUseCasesPort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(cpf: string): Promise<Client | null> {
    try {
      return await this.clientRepository.findByCpf(cpf);
    } catch (error) {
      throw new NotFoundException({
        description: 'Failed to find client by cpf',
      });
    }
  }
}
