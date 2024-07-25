import { Client } from '@/core/domain/client/client.entity';
import { FindAllClientsUseCases } from '@/core/interactor/usecases/client/find-all-clients.use-cases';

import { IClientRepository } from '@/core/repository/client/client.repository';

describe('FindAllClientsUseCases', () => {
  let useCase: FindAllClientsUseCases;
  let clientRepository: IClientRepository;

  beforeEach(async () => {
    clientRepository = {
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    useCase = new FindAllClientsUseCases(clientRepository);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return an array of clients', async () => {
    const clients = [
      new Client('1', 'Gandalf The Grey', 'gandalf.grey@example.com', '49744639857'),
      new Client('2', 'Radagast The Brown', 'radagast.brown@example.com', '78157968429'),
    ];
    (clientRepository.findAll as jest.Mock).mockResolvedValue(clients);

    expect(await useCase.execute()).toBe(clients);
    expect(clientRepository.findAll).toHaveBeenCalled();
  });

  it('should return an empty array if no clients are found', async () => {
    (clientRepository.findAll as jest.Mock).mockResolvedValue([]);

    expect(await useCase.execute()).toEqual([]);
    expect(clientRepository.findAll).toHaveBeenCalled();
  });
});
