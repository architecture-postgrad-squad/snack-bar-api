import { Client } from '@/domain/entity/client/client.entity';
import { ClientReaderServicePort } from '@/domain/interactor/port/client/client-reader-service.port';
import { IClientRepository } from '@/domain/repository/client/client.repository';

export class ClientReaderService implements ClientReaderServicePort {
  constructor(private readonly clientRepository: IClientRepository) {}

  async findById(id: string): Promise<Client> {
    return this.clientRepository.findById(id).catch((e) => {
      console.log(`Failed to find client by id ${id}`);
      throw e;
    });
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}
