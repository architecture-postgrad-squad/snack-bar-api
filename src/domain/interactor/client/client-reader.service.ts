import { InternalServerErrorException } from '@/config/exceptions/custom-exceptions/internal-server-error.exception';
import { NotFoundException } from '@/config/exceptions/custom-exceptions/not-found.exception';
import { Client } from '@/domain/entity/client/client.entity';
import { ClientReaderServicePort } from '@/domain/interactor/port/client/client-reader-service.port';
import { IClientRepository } from '@/domain/repository/client/client.repository';

export class ClientReaderService implements ClientReaderServicePort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async findById(id: string): Promise<Client> {
    try {
      const client = await this.clientRepository.findById(id);
      if (!client) {
        throw new NotFoundException({
          description: 'Failed to find client by id',
        });
      }
      return client;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findByCpf(cpf: string): Promise<Client> {
    try {
      const client = await this.clientRepository.findByCpf(cpf);
      if (!client) {
        throw new NotFoundException({
          description: 'Failed to find client by cpf',
        });
      }
      return client;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      return this.clientRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
