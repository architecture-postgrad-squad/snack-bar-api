import { Client } from '@/domain/entity/client/client.entity';
import { ClientReaderService } from '@/domain/interactor/services/client/client-reader.service';
import { IClientRepository } from '@/domain/repository/client/client.repository';

describe('ClientReaderService', () => {
  let service: ClientReaderService;
  let clientRepository: IClientRepository;

  beforeEach(async () => {
    clientRepository = {
      findById: jest.fn(),
      findByCpf: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    service = new ClientReaderService(clientRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a client if found', async () => {
      const client = new Client(
        '1',
        'Gandalf The Grey',
        'gandalf.grey@example.com',
        '49744639857',
      );
      (clientRepository.findById as jest.Mock).mockResolvedValue(client);

      expect(await service.findById('1')).toBe(client);
      expect(clientRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if client is not found', async () => {
      (clientRepository.findById as jest.Mock).mockRejectedValue(
        new Error('Client not found'),
      );

      await expect(service.findById('1')).rejects.toThrow(Error);
      expect(clientRepository.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('findByCpf', () => {
    it('should return a client if found', async () => {
      const client = new Client(
        '1',
        'Gandalf The Grey',
        'gandalf.grey@example.com',
        '49744639857',
      );
      (clientRepository.findByCpf as jest.Mock).mockResolvedValue(client);

      expect(await service.findByCpf('49744639857')).toBe(client);
      expect(clientRepository.findByCpf).toHaveBeenCalledWith('49744639857');
    });

    it('should throw an error if client is not found', async () => {
      (clientRepository.findByCpf as jest.Mock).mockRejectedValue(
        new Error('Client not found'),
      );

      await expect(service.findByCpf('49744639857')).rejects.toThrow(Error);
      expect(clientRepository.findByCpf).toHaveBeenCalledWith('49744639857');
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const clients = [
        new Client('1', 'Gandalf The Grey', 'gandalf.grey@example.com', '49744639857'),
        new Client(
          '2',
          'Radagast The Brown',
          'radagast.brown@example.com',
          '78157968429',
        ),
      ];
      (clientRepository.findAll as jest.Mock).mockResolvedValue(clients);

      expect(await service.findAll()).toBe(clients);
      expect(clientRepository.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no clients are found', async () => {
      (clientRepository.findAll as jest.Mock).mockResolvedValue([]);

      expect(await service.findAll()).toEqual([]);
      expect(clientRepository.findAll).toHaveBeenCalled();
    });
  });
});
