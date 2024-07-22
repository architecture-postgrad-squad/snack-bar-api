import { NotFoundException } from '@/core/exceptions/custom-exceptions/not-found.exception';
import { Client } from '@/core/domain/client/client.entity';
import { ClientReaderServicePort } from '@/core/interactor/port/client/client-reader-service.port';
import { IClientRepository } from '@/core/repository/client/client.repository';

export class ClientReaderService implements ClientReaderServicePort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async findById(id: string): Promise<Client> {
    try {
      return await this.clientRepository.findById(id);
    } catch (error) {
      throw new NotFoundException({
        description: 'Failed to find client by id',
      });
    }
  }

  async findByCpf(cpf: string): Promise<Client> {
    try {
      return await this.clientRepository.findByCpf(cpf);
    } catch (error) {
      throw new NotFoundException({
        description: 'Failed to find client by cpf',
      });
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}
